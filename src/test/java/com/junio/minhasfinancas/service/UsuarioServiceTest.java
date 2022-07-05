package com.junio.minhasfinancas.service;

import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles(value = "test")
public class UsuarioServiceTest {
  @Autowired
  UsuarioService usuarioService;

  @Autowired
  UsuarioRepository usuarioRepository;

  @Test(expected = Test.None.class)
  public void deveValidarEmail(){
    //cenário
    usuarioRepository.deleteAll();
    usuarioService.validarEmail("libio@libio.com.br");
  }

  @Test(expected = RegraNegocioException.class)
  public void deveLancarErroAoValidarEmailQuandoExistir(){
    // cenário
    usuarioRepository.deleteAll();
    Usuario usuario = Usuario.builder().nome("Libio").email("libio@libio.com.br").build();
    usuarioRepository.save(usuario);
    // ação
    usuarioService.validarEmail(usuario.getEmail());
  }
}
