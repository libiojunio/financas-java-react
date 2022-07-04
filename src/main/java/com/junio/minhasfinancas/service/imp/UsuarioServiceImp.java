package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class UsuarioServiceImp implements UsuarioService {

  private UsuarioRepository usuarioRepository;

  @Autowired
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
    boolean existe = usuarioRepository.existsByEmail(email);
    if (existe) {
      throw new RegraNegocioException("Já existe um usuario cadastrado com esse email.");
    }
  }
}
