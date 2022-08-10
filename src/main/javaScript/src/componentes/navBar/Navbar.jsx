import React from 'react';
import NavbarItem from './NavbarItem';
import {ROTA_CADASTRO_USUARIOS, ROTA_CONSULTA_LANCAMENTOS, ROTA_HOME, ROTA_LOGIN} from '../../utils/constantes';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService/AuthService';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsuarioAutenticado: AuthService.isUsuarioAutenticado()
    };
  }

  sair() {
    AuthService.limparDadosUsuarioLogado();
    this.setState({isUsuarioAutenticado: AuthService.isUsuarioAutenticado()});
  }

  render() {
    return(
      <>
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
            <Link to={ROTA_HOME} className="navbar-brand">Minhas Finanças</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav">
                <NavbarItem href={'/'} label={'Home'} />
                <NavbarItem href={ROTA_CADASTRO_USUARIOS} label={'Usuários'} />
                <NavbarItem href={ROTA_CONSULTA_LANCAMENTOS} label={'Lançamentos'} />
                {this.state.isUsuarioAutenticado ?
                  <NavbarItem href={ROTA_LOGIN} label={'Sair'} onClick={this.sair} /> :
                  <NavbarItem href={ROTA_LOGIN} label={'Login'} />}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default Navbar;
