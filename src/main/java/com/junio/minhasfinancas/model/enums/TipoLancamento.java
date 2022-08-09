package com.junio.minhasfinancas.model.enums;

public enum TipoLancamento {
  RECEITA(1L, "Receita"),
  DESPESA(2L,"Despesa");

  private Long id;
  private String descricao;

  public String getDescricao() {
    return descricao;
  }

  public Long getId() {
    return id;
  }

  TipoLancamento(Long id, String descricao) {
    this.id = id;
    this.descricao = descricao;
  }
}
