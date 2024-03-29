package com.junio.minhasfinancas.api.resource.token;

import com.junio.minhasfinancas.model.entity.Usuario;
import com.junio.minhasfinancas.service.imp.SecurityUserDetailsService;
import com.junio.minhasfinancas.service.interfaces.JwtService;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

  @Autowired
  private JwtService jwtService;

  private SecurityUserDetailsService securityUserDetailsService;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      @NotNull HttpServletResponse response,
      @NotNull FilterChain filterChain) throws ServletException, IOException {
    String authorization = request.getHeader("Authorization");
    if (authorization != null && authorization.startsWith("Bearer")){
      String token = authorization.split(" ")[1];
      if (jwtService.isTokenValido(token)) {
        String login = jwtService.obterLoginUsuario(token);
        UserDetails userDetails = securityUserDetailsService.loadUserByUsername(login);
        UsernamePasswordAuthenticationToken user =
            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        user.setDetails(new WebAuthenticationDetailsSource());
        SecurityContextHolder.getContext().setAuthentication(user);
      }
    }
    filterChain.doFilter(request, response);
  }
}
