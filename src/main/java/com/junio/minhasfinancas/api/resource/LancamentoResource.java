package com.junio.minhasfinancas.api.resource;

import com.junio.minhasfinancas.api.resource.forms.LancamentoForm;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Lancamento;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.enums.StatusLancamento;
import com.junio.minhasfinancas.model.enums.TipoLancamento;
import com.junio.minhasfinancas.service.interfaces.LancamentoService;
import com.junio.minhasfinancas.service.interfaces.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lancamentos")
public class LancamentoResource {

  private final LancamentoService lancamentoService;
  private final UsuarioService usuarioService;

  @GetMapping
  public ResponseEntity buscar (
      @RequestParam(value = "tipo", required = false) String tipo,
      @RequestParam(value = "descricao", required = false) String descricao,
      @RequestParam(value = "mes", required = false) Integer mes,
      @RequestParam(value = "ano", required = false) Integer ano,
      @RequestParam("usuario") Long id
  ){
    Lancamento lancamentoFilter = new Lancamento();
    lancamentoFilter.setDescricao(descricao);
    lancamentoFilter.setMes(mes);
    lancamentoFilter.setAno(ano);
    if (tipo != null) {
      lancamentoFilter.setTipo(TipoLancamento.valueOf(tipo));
    }

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

  @GetMapping("/buscarLancamentoId")
  public ResponseEntity buscarLancamentoId (
          @RequestParam("usuarioId") Long usuarioId,
          @RequestParam("lancamentoId") Long lancamentoId
  ){
    Optional<Usuario> usuario = usuarioService.findById(usuarioId);
    if (usuario.isPresent()) {
      Optional<Lancamento> lancamento = lancamentoService.findById(lancamentoId);
      if (lancamento.isPresent() && lancamento.get().getUsuario().getId().equals(usuario.get().getId())){
        return ResponseEntity.ok(lancamento);
      }
      else {
        return ResponseEntity.badRequest().body("O lançamento não pertence a este usuário.");
      }
    }
    else {
      return ResponseEntity.badRequest().body("Usuário não encontrado.");
    }
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

  @PutMapping("{id}/atualizarstatus")
  public ResponseEntity atualizarStatus(@PathVariable("id") Long id, @RequestBody LancamentoForm lancamentoForm){
    Optional<Lancamento> optiLancamento = lancamentoService.findById(id);
    if (optiLancamento.isPresent()) {
      Lancamento lancamento = optiLancamento.get();
      if (lancamentoForm.getStatus() != null) {
        lancamento.setStatusLancamento(StatusLancamento.valueOf(lancamentoForm.getStatus()));
        lancamentoService.atualizar(lancamento);
      }
      return ResponseEntity.ok(lancamento);
    }
    return ResponseEntity.badRequest().body("Usuário não existe!");
  }

  @GetMapping("{id}/saldo")
  public ResponseEntity saldo (@PathVariable("id") Long id){
    Optional<Usuario> usuario = usuarioService.findById(id);
    Lancamento lancamentoFilter = new Lancamento();

    if (usuario.isPresent()) {
      BigDecimal receita = BigDecimal.ZERO;
      BigDecimal despesa = BigDecimal.ZERO;
      lancamentoFilter.setUsuario(usuario.get());
      List<Lancamento> lancamentoList = lancamentoService.buscar(lancamentoFilter);

      for (Lancamento lancamento : lancamentoList) {
        if (lancamento.getTipo().equals(TipoLancamento.RECEITA)) {
          receita = receita.add(lancamento.getValor());
        }
        else {
          despesa = despesa.add(lancamento.getValor());
        }
      }
      return ResponseEntity.ok(receita.subtract(despesa));
    }

    return ResponseEntity.badRequest().body("Usuário não encontrado.");
  }
}
