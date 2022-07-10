package com.junio.minhasfinancas.api.resource;

import com.junio.minhasfinancas.api.resource.forms.UsuarioForm;
import com.junio.minhasfinancas.exception.ErroAutenticacao;
import com.junio.minhasfinancas.exception.RegraNegocioException;
import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.service.interfaces.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@AllArgsConstructor
public class UsuarioResource {

  private UsuarioService usuarioService;

  @PostMapping
  public ResponseEntity salvar(@RequestBody UsuarioForm usuarioForm){
    Usuario usuario = Usuario.builder()
      .nome(usuarioForm.getNome())
      .email(usuarioForm.getEmail())
      .senha(usuarioForm.getSenha())
      .build();

    try {
      Usuario usuarioSalvo = usuarioService.salvarUsuario(usuario);
      return new ResponseEntity(usuarioSalvo, HttpStatus.CREATED);
    } catch (RegraNegocioException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }

  }

  @PostMapping("/autenticar")
  public ResponseEntity autenticar(@RequestBody UsuarioForm usuarioForm){
    try {
      Usuario usuario = usuarioService.autenticar(usuarioForm.getEmail(), usuarioForm.getSenha());
      return new ResponseEntity(usuario, HttpStatus.OK);
    } catch (ErroAutenticacao e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
