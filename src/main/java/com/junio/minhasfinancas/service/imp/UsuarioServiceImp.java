package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.exception.ErroAutenticacao;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

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
    Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
    if (!usuario.isPresent()) {
      throw new ErroAutenticacao("Usuário não encontrado");
    }
    if (!usuario.get().getEmail().equals(email)) {
      throw new ErroAutenticacao("email inválido");
    }
    if (!usuario.get().getSenha().equals(senha)) {
      throw new ErroAutenticacao("senha inválida");
    }
    return usuario.get();
  }

  /**
   * @param usuario
   * @return
   */
  @Override
  @Transactional
  public Usuario salvarUsuario(Usuario usuario) {
    validarEmail(usuario.getEmail());
    return usuarioRepository.save(usuario);
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
