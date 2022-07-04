package com.junio.minhasfinancas.service;

import com.junio.minhasfinancas.model.entity.Usuario;

public interface UsuarioService {
  Usuario autenticar(String email, String senha);
  Usuario salvarUsuario(Usuario usuario);
  void validarEmail(String email);
}
