package com.junio.minhasfinancas.model.repository;

import com.junio.minhasfinancas.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {}
