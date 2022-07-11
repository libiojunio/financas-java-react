package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.exception.ErroAutenticacao;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Lancamento;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.enums.StatusLancamento;
import com.junio.minhasfinancas.model.repository.LancamentoRepository;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.interfaces.LancamentoService;
import com.junio.minhasfinancas.service.interfaces.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LancamentoServiceImp implements LancamentoService {

  private LancamentoRepository lancamentoRepository;

  public LancamentoServiceImp(LancamentoRepository lancamentoRepository) {
    this.lancamentoRepository = lancamentoRepository;
  }

  /**
   * @param lancamento
   * @return
   */
  @Override
  @Transactional
  public Lancamento salvar(Lancamento lancamento) {
    validar(lancamento);
    lancamento.setStatusLancamento(StatusLancamento.PENDENTE);
    return lancamentoRepository.save(lancamento);
  }

  /**
   * @param lancamento
   * @return
   */
  @Override
  @Transactional
  public Lancamento atualizar(Lancamento lancamento) {
    Objects.requireNonNull(lancamento.getId());
    validar(lancamento);
    return lancamentoRepository.save(lancamento);
  }

  /**
   * @param lancamento
   */
  @Override
  @Transactional
  public void deletar(Lancamento lancamento) {
    Objects.requireNonNull(lancamento.getId());
    lancamentoRepository.delete(lancamento);
  }

  /**
   * @param lancamento
   * @return
   */
  @Override
  @Transactional(readOnly = true)
  public List<Lancamento> buscar(Lancamento lancamento) {
    Example example = Example.of(
      lancamento,
      ExampleMatcher.matching().withIgnoreCase().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING));

    return lancamentoRepository.findAll(example);
  }

  /**
   * @param lancamento
   * @param statusLancamento
   */
  @Override
  public void atualizarStatus(Lancamento lancamento, StatusLancamento statusLancamento) {
    lancamento.setStatusLancamento(statusLancamento);
    atualizar(lancamento);
  }

  /**
   * @param lancamento
   */
  @Override
  public void validar(Lancamento lancamento) {
    if (lancamento.getDescricao() == null || lancamento.getDescricao().trim().equals("")
    ) {
      throw new RegraNegocioException("Informe uma descrição válida!");
    }

    if (lancamento.getMes() == null || lancamento.getMes() < 1 || lancamento.getMes() > 12) {
      throw new RegraNegocioException("Informe um mês válido!");
    }

    if (lancamento.getAno() == null || lancamento.getAno().toString().length() != 4) {
      throw new RegraNegocioException("Informe um ano válido!");
    }

    if (lancamento.getUsuario() == null || lancamento.getUsuario().getId() == null) {
      throw new RegraNegocioException("Informe um usuário válido!");
    }

    if (lancamento.getValor() == null || lancamento.getValor().compareTo(BigDecimal.ZERO) < 1) {
      throw new RegraNegocioException("Informe um valor válido!");
    }

    if (lancamento.getTipo() == null) {
      throw new RegraNegocioException("Informe um tipo válido!");
    }
  }

  /**
   * @param id
   * @return
   */
  @Override
  public Optional<Lancamento> findById(Long id) {
    return lancamentoRepository.findById(id);
  }
}
