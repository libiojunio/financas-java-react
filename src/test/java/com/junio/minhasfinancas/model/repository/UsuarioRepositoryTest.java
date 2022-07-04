package com.junio.minhasfinancas.model.repository;

import com.junio.minhasfinancas.model.entity.Usuario;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UsuarioRepositoryTest {

  @Autowired
  UsuarioRepository usuarioRepository;

  @Test
  public void deveVerificarAExistentenciaDeUmEmail(){
    //cenário
    Usuario usuario = new Usuario();
    usuario.setNome("Libio");
    usuario.setEmail("libio@libio.com.br");
    usuarioRepository.save(usuario);
    //ação
    boolean resultado = usuarioRepository.existsByEmail("libio@libio.com.br");
    //verificação
    Assertions.assertEquals(true, resultado);
  }
}
