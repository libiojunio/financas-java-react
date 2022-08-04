package com.junio.minhasfinancas.api.resource.forms;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioForm {
  private String email;
  private String nome;
  private String senha;
}
