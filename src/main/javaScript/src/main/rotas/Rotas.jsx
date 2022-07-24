import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from '../../views/login/Login';
import Cadastro from '../../views/cadastro/Cadastro';
import Home from '../../views/home/Home';
import {ROTA_CADASTRO_USUARIOS, ROTA_HOME, ROTA_LOGIN} from '../../utils/constantes';

class Rotas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
   return (
     <Routes>
        <Route path={ROTA_HOME} element={<Home />} />
        <Route path={ROTA_LOGIN} element={<Login />} />
        <Route path={ROTA_CADASTRO_USUARIOS} element={<Cadastro />} />
    </Routes>
   )
  }
}

export default Rotas;
