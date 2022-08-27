package com.junio.minhasfinancas.api.resource.token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Token {
  private Long id;
  private String nome;
  private String email;
  private String token;
}
