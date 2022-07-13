package com.junio.minhasfinancas.api.resource;

import com.junio.minhasfinancas.api.resource.forms.LancamentoForm;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Lancamento;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.enums.StatusLancamento;
import com.junio.minhasfinancas.model.enums.TipoLancamento;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.interfaces.LancamentoService;
import com.junio.minhasfinancas.service.interfaces.UsuarioService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lancamentos")
public class LancamentoResource {

  private final LancamentoService lancamentoService;
  private final UsuarioService usuarioService;

  @GetMapping
  public ResponseEntity buscar (
      @RequestParam(value = "descricao", required = false) String descricao,
      @RequestParam(value = "mes", required = false) Integer mes,
      @RequestParam(value = "ano", required = false) Integer ano,
      @RequestParam("usuario") Long id
  ){
    Lancamento lancamentoFilter = new Lancamento();
    lancamentoFilter.setDescricao(descricao);
    lancamentoFilter.setMes(mes);
    lancamentoFilter.setAno(ano);

   Optional<Usuario> usuario = usuarioService.findById(id);
    if (usuario.isPresent()) {
      lancamentoFilter.setUsuario(usuario.get());
    }
    else {
      return ResponseEntity.badRequest().body("Usuário não encontrado.");
    }
    List<Lancamento> lancamentoList = lancamentoService.buscar(lancamentoFilter);
    return ResponseEntity.ok(lancamentoList);
  }

  @PostMapping
  public ResponseEntity salvar(@RequestBody LancamentoForm lancamentoForm){
    Lancamento lancamento = new Lancamento();
    converter(lancamento, lancamentoForm);
    lancamentoService.salvar(lancamento);
    try {
      return new ResponseEntity(lancamento, HttpStatus.CREATED);
    } catch (RegraNegocioException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @DeleteMapping("{id}")
  public ResponseEntity deletar(@PathVariable("id") Long id){
    Optional<Lancamento> lancamentoSalvo = lancamentoService.findById(id);
    if (lancamentoSalvo.isPresent()) {
      lancamentoSalvo.map(lanc -> {
        try {
          lancamentoService.deletar(lanc);
        } catch (Exception e) {
          return ResponseEntity.badRequest().body(e.getMessage());
        }
        return lancamentoSalvo;
      });
      return ResponseEntity.ok(HttpEntity.EMPTY);
    }
    throw new RegraNegocioException("Lançamento não encontrado na base de dados");
  }

  @PutMapping("{id}")
  public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody LancamentoForm lancamentoForm){
    Optional<Lancamento> optiLancamento = lancamentoService.findById(id);
    if (optiLancamento.isPresent()) {
      Lancamento lancamento = optiLancamento.get();
      try {
        converter(lancamento, lancamentoForm);
        lancamentoService.atualizar(lancamento);
      } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
      }
      return new ResponseEntity(lancamento, HttpStatus.OK);
    }
    throw new RegraNegocioException("Lançamento não encontrado na base de dados");
  }

  private Lancamento converter(Lancamento lancamento, LancamentoForm lancamentoForm){
    if (lancamento.getId() == null) {
      lancamento.setId(lancamentoForm.getId());
    }
    lancamento.setAno(lancamentoForm.getAno());
    lancamento.setMes(lancamentoForm.getMes());
    lancamento.setDescricao(lancamentoForm.getDescricao());
    lancamento.setValor(lancamentoForm.getValor());
    if (lancamento.getUsuario() == null) {
      Optional<Usuario> usuario = usuarioService.findById(lancamentoForm.getUsuario());
      if (!usuario.isPresent()) {
        throw new RegraNegocioException("Usuário não encontrado.");
      }
      lancamento.setUsuario(usuario.get());
    }
    if (lancamentoForm.getTipo() != null) {
      lancamento.setTipo(TipoLancamento.valueOf(lancamentoForm.getTipo()));
    }
    if (lancamentoForm.getStatus() != null) {
      lancamento.setStatusLancamento(StatusLancamento.valueOf(lancamentoForm.getStatus()));
    }
    return lancamento;
  }
}
