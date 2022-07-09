package com.junio.minhasfinancas.api.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioResource {

  @GetMapping("/teste")
  public String helloWorld(){
    return "helloWorld";
  }
}
