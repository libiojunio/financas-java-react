package com.junio.minhasfinancas.api.resource.token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Token {
  private String nome;
  private String token;
}
