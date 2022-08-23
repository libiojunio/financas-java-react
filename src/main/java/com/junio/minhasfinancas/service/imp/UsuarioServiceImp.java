package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.exception.ErroAutenticacao;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.interfaces.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class UsuarioServiceImp implements UsuarioService {

  private UsuarioRepository usuarioRepository;

  private PasswordEncoder passwordEncoder;

  @Autowired
  public UsuarioServiceImp(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
    super();
    this.passwordEncoder = passwordEncoder;
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
      throw new ErroAutenticacao("email ou senha inválido");
    }
    if (!passwordEncoder.matches(senha, usuario.get().getSenha())) {
      throw new ErroAutenticacao("email ou senha inválido");
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
    usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
    return usuarioRepository.save(usuario);
  }

  /**
   * @param email
   */
  @Override
  public void validarEmail(String email) {
    boolean existe = usuarioRepository.existsByEmail(email);
    if (existe) {
      throw new RegraNegocioException("Já existe um usuário cadastrado com esse email.");
    }
  }

  /**
   * @param id
   * @return
   */
  @Override
  public Optional<Usuario> findById(Long id) {
    if (id != null) {
      return usuarioRepository.findById(id);
    }
    throw new RegraNegocioException("Id do usuário invalido ou vazio.");
  }


}
