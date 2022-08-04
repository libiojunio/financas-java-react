package com.junio.minhasfinancas.api.resource.forms;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LancamentoForm {
  private Long id;
  private String descricao;
  private Integer mes;
  private Integer ano;
  private BigDecimal valor;
  private Long usuario;
  private String tipo;
  private String status;
}
