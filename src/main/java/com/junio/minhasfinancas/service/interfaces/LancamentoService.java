package com.junio.minhasfinancas.service.interfaces;

import com.junio.minhasfinancas.model.entity.Lancamento;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.enums.StatusLancamento;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface LancamentoService {
  Lancamento salvar(Lancamento lancamento);
  Lancamento atualizar(Lancamento lancamento);
  void deletar(Lancamento lancamento);
  List<Lancamento> buscar (Lancamento lancamento);
  void atualizarStatus(Lancamento lancamento, StatusLancamento statusLancamento);
  void validar(Lancamento lancamento);
  Optional<Lancamento> findById(Long id);
}
