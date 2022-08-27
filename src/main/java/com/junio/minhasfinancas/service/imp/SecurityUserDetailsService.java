package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserDetailsService implements UserDetailsService {

  private UsuarioRepository usuarioRepository;

  public SecurityUserDetailsService(UsuarioRepository usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email não encontrado"));
    return User.builder().username(usuario.getEmail())
        .password(usuario.getSenha())
        .roles("USER")
        .build();
  }
}
