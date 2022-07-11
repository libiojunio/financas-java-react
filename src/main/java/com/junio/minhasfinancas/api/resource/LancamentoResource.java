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
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/lancamentos")
public class LancamentoResource {

  private LancamentoService lancamentoService;

  private UsuarioService usuarioService;

  private UsuarioRepository usuarioRepository;

  @PostMapping
  public ResponseEntity salvar(@RequestBody LancamentoForm lancamentoForm){
    Lancamento lancamento = converter(lancamentoForm);
    Lancamento lancamentoSalvo = lancamentoService.salvar(lancamento);
    try {
      return new ResponseEntity(lancamentoSalvo, HttpStatus.CREATED);
    } catch (RegraNegocioException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PutMapping("{id}")
  public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody LancamentoForm lancamentoForm){
    Optional<Lancamento> lancamentoSalvo = lancamentoService.findById(id);
    lancamentoSalvo.map(lanc -> {
      try {
        Lancamento lancamento = converter(lancamentoForm);
        lancamento.setId(lanc.getId());
        Lancamento lancamentoAtt = lancamentoService.atualizar(lancamento);
        return new ResponseEntity(lancamentoAtt, HttpStatus.OK);
      } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
      }
    });
    throw new RegraNegocioException("Lançamento não encontrado na base de dados");
  }

  private Lancamento converter(LancamentoForm lancamentoForm){
    Lancamento lancamento = new Lancamento();
    lancamento.setId(lancamentoForm.getId());
    lancamento.setAno(lancamentoForm.getAno());
    lancamento.setMes(lancamentoForm.getMes());
    lancamento.setDescricao(lancamentoForm.getDescricao());
    lancamento.setValor(lancamentoForm.getValor());
    Optional<Usuario> usuario = usuarioService.findById(lancamentoForm.getUsuario());
    if (!usuario.isPresent()) {
      throw new RegraNegocioException("Usuário não encontrado.");
    }
    lancamento.setUsuario(usuario.get());
    if (lancamentoForm.getTipo() != null) {
      lancamento.setTipo(TipoLancamento.valueOf(lancamentoForm.getTipo()));
    }
    if (lancamentoForm.getStatus() != null) {
      lancamento.setStatusLancamento(StatusLancamento.valueOf(lancamentoForm.getStatus()));
    }
    return lancamento;
  }
}
