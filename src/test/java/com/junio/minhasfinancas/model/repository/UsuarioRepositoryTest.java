package com.junio.minhasfinancas.model.repository;

import com.junio.minhasfinancas.model.entity.Usuario;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles(value = "test")
public class UsuarioRepositoryTest {

  @Autowired
  UsuarioRepository usuarioRepository;

  @Test
  public void deveVerificarAExistentenciaDeUmEmail(){
    //cenário
    Usuario usuario = Usuario.builder().nome("Libio").email("libio@libio.com.br").build();
    usuarioRepository.save(usuario);
    //ação
    boolean resultado = usuarioRepository.existsByEmail("libio@libio.com.br");
    //verificação
    Assertions.assertEquals(true, resultado);
  }

  @Test
  public void deveRetornarFalsoQuandoNaoHouverUsuarioCadastradoComEmail(){
    // cenário
    usuarioRepository.deleteAll();
    Usuario usuario = Usuario.builder().nome("Libio").email("libio@libio.com.br").build();
    // ação
    usuarioRepository.save(usuario);
    //verificação
    boolean resultado = usuarioRepository.existsByEmail("libio@libio.com.br");
    Assertions.assertEquals(true, resultado);

    resultado = usuarioRepository.existsByEmail("libio2@libio.com.br");
    Assertions.assertEquals(false, resultado);
  }
}
