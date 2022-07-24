import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from '../../views/login/Login';
import Cadastro from '../../views/cadastro/Cadastro';
import Home from '../../views/home/Home';
import {rotaCadastroUsuarios, rotaHome, rotaLogin} from '../../utils/constantes';

class Rotas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
   return (
     <Routes>
        <Route path={rotaHome} element={<Home />} />
        <Route path={rotaLogin} element={<Login />} />
        <Route path={rotaCadastroUsuarios} element={<Cadastro />} />
    </Routes>
   )
  }
}

export default Rotas;
