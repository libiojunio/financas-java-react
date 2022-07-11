package com.junio.minhasfinancas.service.interfaces;

import com.junio.minhasfinancas.model.entity.Usuario;

import java.util.Optional;

public interface UsuarioService {
  Usuario autenticar(String email, String senha);
  Usuario salvarUsuario(Usuario usuario);
  void validarEmail(String email);
  Optional<Usuario> findById(Long id);
}
