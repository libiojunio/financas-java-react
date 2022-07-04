package com.junio.minhasfinancas.model.repository;

import com.junio.minhasfinancas.model.entity.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {}
