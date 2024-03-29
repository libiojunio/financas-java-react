﻿
-- DROP DATABASE minhasfinancas;

CREATE DATABASE minhasfinancas;

CREATE SCHEMA financas;

create table financas.usuario (
id bigserial not null primary key,
nome character varying(150),
email character varying(100),
senha character varying(255),
data_cadastro date default now()
);


CREATE TABLE financas.lancamento
(
  id bigserial NOT NULL PRIMARY KEY ,
  descricao character varying(100) NOT NULL,
  mes integer NOT NULL,
  ano integer NOT NULL,
  valor numeric(16,2) NOT NULL,
  tipo character varying(20) NOT NULL,
  status character varying(20) CHECK(STATUS IN ('PENDENTE', 'CANCELADO', 'EFETIVADO')) NOT NULL,
  id_usuario bigint REFERENCES financas.usuario (id) NOT NULL,
  data_cadastro date default now(),
  CONSTRAINT lancamento_pkey PRIMARY KEY (id),
  CONSTRAINT lancamento_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES financas.usuario (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT lancamento_status_check CHECK(status::text = ANY(ARRAY['PENDENTE'::character varying, 'CANCELADO'::character varying, 'EFETIVADO'::character varying]::text[])),
  CONSTRAINT lancamento_tipo_check CHECK(tipo::text = ANY(ARRAY['RECEITA'::character varying, 'DESPESA'::character varying]::text[]))
) WITH (
    OIDS=FALSE
);

ALTER TABLE financas.lancamento OWNER TO postgres;


-- mysql

CREATE DATABASE financas;

CREATE SCHEMA minhasfinancas;

create table financas.usuario (
    id int not null primary key AUTO_INCREMENT,
    nome varchar(150),
    email varchar(100),
    senha varchar(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financas.lancamento
(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao varchar(100) NOT NULL,
    mes int NOT NULL,
    ano int NOT NULL,
    valor numeric(16,2) NOT NULL,
    tipo varchar(20) NOT NULL,
    status varchar(20) NOT NULL,
    id_usuario int REFERENCES financas.usuario (id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
