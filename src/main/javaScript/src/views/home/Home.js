import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {marginRight5px, rotaCadastroUsuarios, rotaLancamentos, urlSaldoUsuario} from '../../utils/constantes';
import axios from 'axios';

const Home = () => {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    axios.get(`${urlSaldoUsuario}/1/saldo`).then((response) => {
      setSaldo(response.data)
    });
  });

  return (
    <div className="jumbotron">
      <h1 className="display-3">Bem vindo!</h1>
      <p className="lead">Esse é seu sistema de finanças.</p>
      <p className="lead">Seu saldo para o mês atual é de R${saldo}</p>
      <hr className="my-4"/>
      <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
      <p className="lead">
        <Link to={rotaCadastroUsuarios} style={marginRight5px} className="btn btn-primary btn-lg" role="button">
          <i className="fa fa-users" ></i>
          Cadastrar Usuário
        </Link>
        <Link to={rotaLancamentos} className="btn btn-danger btn-lg" role="button">
          <i className="fa fa-users"></i>
          Cadastrar Lançamento
        </Link>
      </p>
    </div>
  )
}

export default Home;
