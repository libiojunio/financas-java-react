package com.junio.minhasfinancas.service;

import com.junio.minhasfinancas.exception.ErroAutenticacao;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.model.repository.UsuarioRepository;
import com.junio.minhasfinancas.service.imp.UsuarioServiceImp;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles(value = "test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UsuarioServiceTest {
  @Autowired
  UsuarioService usuarioService;

  @Autowired
  UsuarioRepository usuarioRepository;

  @Before
  public void setUp() {
    usuarioRepository = Mockito.mock(UsuarioRepository.class);
    usuarioService = new UsuarioServiceImp(usuarioRepository);
  }

  @Test(expected = Test.None.class)
  public void deveValidarEmail(){
    Mockito.when(usuarioRepository.existsByEmail(Mockito.anyString())).thenReturn(false);
    usuarioService.validarEmail("libio@libio.com.br");
  }

  @Test(expected = Test.None.class)
  public void testarAutenticacaoDeUsuario(){
    Usuario usuario = povoadorUsuario();
    usuarioRepository.save(usuario);
    usuarioService.autenticar("libio@libio.com.br", "123456");
  }

  @Test(expected = Test.None.class)
  public void testarSalvarUsuario(){
    Usuario usuario = povoadorUsuario();
    usuario = usuarioService.salvarUsuario(usuario);
    Assertions.assertEquals(true, usuario.getId() != null);
  }

  private Usuario povoadorUsuario(){
    return Usuario.builder().nome("Libio").email("libio@libio.com.br").senha("123456").build();
  }
}
