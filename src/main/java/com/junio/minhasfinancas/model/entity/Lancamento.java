package com.junio.minhasfinancas.model.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "lancamento", schema = "financas")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Lancamento that = (Lancamento) o;
    return id != null && Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
