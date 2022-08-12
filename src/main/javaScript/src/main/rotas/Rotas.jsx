import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../views/login/Login';
import Cadastro from '../../views/cadastro/Cadastro';
import Home from '../../views/home/Home';
import {
  ROTA_CADASTRO_USUARIOS,
  ROTA_CADASTRO_LANCAMENTOS,
  ROTA_CONSULTA_LANCAMENTOS,
  ROTA_HOME,
  ROTA_LOGIN
} from '../../utils/constantes';
import ConsultaLancamentos from '../../views/lancamentos/ConsultaLancamentos';
import CadastroLancamentos from '../../views/lancamentos/CadastroLancamentos';
import {withRouter} from '../../componentes/withRouter';

class Rotas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isUsuarioAutenticado){
      return (
        <Routes>
          <Route path={ROTA_HOME} element={<Home />} />
          <Route path={ROTA_LOGIN}
                 element={<Login setIsUsuarioAutenticado={this.props.setIsUsuarioAutenticado}/>} />
          <Route path={ROTA_CADASTRO_USUARIOS} element={<Cadastro />} />
          <Route path={ROTA_CONSULTA_LANCAMENTOS} element={<ConsultaLancamentos />} />
          <Route path={ROTA_CADASTRO_LANCAMENTOS}>
            <Route index element={<CadastroLancamentos />} />
            <Route path=":id" element={<CadastroLancamentos />} />
          </Route>
        </Routes>
      );
    }
    else {
      if (
        this.props.location.pathname !== ROTA_CADASTRO_USUARIOS &&
        this.props.location.pathname !== ROTA_LOGIN){
        this.props.navigate(ROTA_LOGIN);
      }

      return (
        <Routes>
          <Route path={ROTA_CADASTRO_USUARIOS} element={<Cadastro />} />
          <Route path={ROTA_LOGIN}
                 element={<Login setIsUsuarioAutenticado={this.props.setIsUsuarioAutenticado}/>} />
        </Routes>
      );
    }
  }
}

export default withRouter(Rotas);
