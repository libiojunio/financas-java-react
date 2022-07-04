package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.UsuarioService;

import java.util.ArrayList;
import java.util.List;

public class UsuarioServiceImp implements UsuarioService {
  private UsuarioRepository usuarioRepository;

  public UsuarioServiceImp(UsuarioRepository usuarioRepository) {
    super();
    this.usuarioRepository = usuarioRepository;
  }

  /**
   * @param email
   * @param senha
   * @return
   */
  @Override
  public Usuario autenticar(String email, String senha) {
    List<String> strings = new ArrayList<>();

    return null;
  }

  /**
   * @param usuario
   * @return
   */
  @Override
  public Usuario salvarUsuario(Usuario usuario) {
    return null;
  }

  /**
   * @param email
   */
  @Override
  public void validarEmail(String email) {

  }
}
