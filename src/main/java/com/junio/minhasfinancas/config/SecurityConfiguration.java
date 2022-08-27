package com.junio.minhasfinancas.config;

import com.junio.minhasfinancas.api.resource.token.JwtTokenFilter;
import com.junio.minhasfinancas.service.imp.SecurityUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  SecurityUserDetailsService securityUserDetailsService;

  @Bean
  public PasswordEncoder passwordEncoder () {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtTokenFilter jwtTokenFilter (){
    return new JwtTokenFilter(null, securityUserDetailsService);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(securityUserDetailsService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/usuarios/autenticar").permitAll()
        .antMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
        .anyRequest().authenticated()
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilter(){
    List<String> all = Arrays.asList("*");
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedMethods(all);
    corsConfiguration.setAllowedOrigins(all);
    corsConfiguration.setAllowedHeaders(all);
    corsConfiguration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);

    CorsFilter corsFilter = new CorsFilter(source);
    FilterRegistrationBean<CorsFilter> filterFilterRegistrationBean =
        new FilterRegistrationBean<CorsFilter>(corsFilter);
    filterFilterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return  filterFilterRegistrationBean;
  }
}
