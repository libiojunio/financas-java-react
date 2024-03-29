package com.junio.minhasfinancas.service.interfaces;

import com.junio.minhasfinancas.model.entity.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface JwtService {
  String getDataHoraExpiracaoToken();
  String gerarToken(Usuario usuario);
  Claims obterClaims(String token) throws ExpiredJwtException;
  boolean isTokenValido(String token);
  String obterLoginUsuario(String token);
}
