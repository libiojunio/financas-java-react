package com.junio.minhasfinancas.model.entity;

import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "lancamento", schema = "financas")
public class Lancamento {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "mes")
  private Integer mes;

  @Column(name="ano")
  private Integer ano;

  @ManyToOne
  @JoinColumn(name = "id_usuario")
  private Usuario usuario;

  @Column(name = "valor")
  private BigDecimal valor;

  @Column(name = "data_cadastro")
  @Convert(converter = Jsr310JpaConverters.LocalDateConverter.class)
  private LocalDate dataCadastro;

  @Column(name = "tipo")
  @Enumerated(EnumType.STRING)
  private TipoLancamento tipoLancamento;

  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  private StatusLancamento statusLancamento;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getMes() {
    return mes;
  }

  public void setMes(Integer mes) {
    this.mes = mes;
  }

  public Integer getAno() {
    return ano;
  }

  public void setAno(Integer ano) {
    this.ano = ano;
  }

  public Usuario getUsuario() {
    return usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }

  public BigDecimal getValor() {
    return valor;
  }

  public void setValor(BigDecimal valor) {
    this.valor = valor;
  }

  public LocalDate getDataCadastro() {
    return dataCadastro;
  }

  public void setDataCadastro(LocalDate dataCadastro) {
    this.dataCadastro = dataCadastro;
  }

  public TipoLancamento getTipoLancamento() {
    return tipoLancamento;
  }

  public void setTipoLancamento(TipoLancamento tipoLancamento) {
    this.tipoLancamento = tipoLancamento;
  }

  public StatusLancamento getStatusLancamento() {
    return statusLancamento;
  }

  public void setStatusLancamento(StatusLancamento statusLancamento) {
    this.statusLancamento = statusLancamento;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Lancamento that = (Lancamento) o;
    return Objects.equals(getId(), that.getId()) && Objects.equals(getMes(), that.getMes()) && Objects.equals(getAno(), that.getAno()) && Objects.equals(getUsuario(), that.getUsuario()) && Objects.equals(getValor(), that.getValor()) && Objects.equals(getDataCadastro(), that.getDataCadastro()) && getTipoLancamento() == that.getTipoLancamento() && getStatusLancamento() == that.getStatusLancamento();
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getMes(), getAno(), getUsuario(), getValor(), getDataCadastro(), getTipoLancamento(), getStatusLancamento());
  }

  @Override
  public String toString() {
    return "Lancamento{" +
      "id=" + id +
      ", mes=" + mes +
      ", ano=" + ano +
      ", usuario=" + usuario +
      ", valor=" + valor +
      ", dataCadastro=" + dataCadastro +
      ", tipoLancamento=" + tipoLancamento +
      ", statusLancamento=" + statusLancamento +
      '}';
  }
}
