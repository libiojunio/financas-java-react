package com.junio.minhasfinancas.service.imp;

import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.service.interfaces.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class JwtServiceImp implements JwtService {

  @Value("${jwt.expiracao}")
  private String expiracao;

  @Value("${jwt.chave-assinatura}")
  private String chaveAssinatura;

  @Override
  public String gerarToken(Usuario usuario) {
    Long expiracao = Long.valueOf(this.expiracao);
    LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(expiracao);
    Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
    Date data = Date.from(instant);
    String horaFormatada = dataHoraExpiracao.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm"));

    return Jwts.builder()
        .setExpiration(data)
        .setSubject(usuario.getEmail())
        .claim("nome", usuario.getNome())
        .claim("horaExpiracao", horaFormatada)
        .signWith(SignatureAlgorithm.HS512, chaveAssinatura)
        .compact();
  }

  @Override
  public Claims obterClaims(String token) throws ExpiredJwtException {
    return Jwts.parser().setSigningKey(chaveAssinatura).parseClaimsJws(token).getBody();
  }

  @Override
  public boolean isTokenValido(String token) {
    try {
      Claims claims = obterClaims(token);
      Date expiration = claims.getExpiration();
      LocalDateTime dataExpiration = expiration.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
      return !LocalDateTime.now().isAfter(dataExpiration);
    } catch (ExpiredJwtException e) {
      return false;
    }
  }

  @Override
  public String obterLoginUsuario(String token) {
    Claims claims = obterClaims(token);
    return claims.getSubject();
  }
}
