package com.junio.minhasfinancas.model.repository;

import com.junio.minhasfinancas.model.entity.Usuario;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@RunWith(SpringRunner.class)
@ActiveProfiles(value = "test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UsuarioRepositoryTest {

  @Autowired
  UsuarioRepository usuarioRepository;

  @Autowired
  TestEntityManager testEntityManager;

  @Test
  public void deveVerificarAExistentenciaDeUmEmail(){
    Usuario usuario = povoadorUsuario();
    testEntityManager.persist(usuario);
    boolean resultado = usuarioRepository.existsByEmail("libio@libio.com.br");
    Assertions.assertEquals(true, resultado);
  }

  @Test
  public void deveRetornarFalsoQuandoNaoHouverUsuarioCadastradoComEmail(){
    Usuario usuario = povoadorUsuario();
    testEntityManager.persist(usuario);
    boolean resultado = usuarioRepository.existsByEmail("libio@libio.com.br");
    Assertions.assertEquals(true, resultado);

    resultado = usuarioRepository.existsByEmail("libio2@libio.com.br");
    Assertions.assertEquals(false, resultado);
  }

  private Usuario povoadorUsuario(){
    return Usuario.builder().nome("Libio").email("libio@libio.com.br").senha("123456").build();
  }
}
