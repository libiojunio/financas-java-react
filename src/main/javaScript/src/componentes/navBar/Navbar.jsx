import React from 'react';
import NavbarItem from './NavbarItem';
import {ROTA_CADASTRO_USUARIOS, ROTA_CONSULTA_LANCAMENTOS, ROTA_HOME, ROTA_LOGIN} from '../../utils/constantes';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService/AuthService';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    AuthService.limparDadosUsuarioLogado();
    this.props.setIsUsuarioAutenticado();
  };

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
                <NavbarItem show href={ROTA_CADASTRO_USUARIOS} label={'Usuários'} />
                <NavbarItem show={this.props.isUsuarioAutenticado} href={'/'} label={'Home'} />
                <NavbarItem show={this.props.isUsuarioAutenticado}
                            href={ROTA_CONSULTA_LANCAMENTOS} label={'Lançamentos'} />
                {this.props.isUsuarioAutenticado ?
                  <NavbarItem show href={ROTA_LOGIN} label={'Sair'} onClick={this.logout} /> :
                  <NavbarItem show href={ROTA_LOGIN} label={'Login'} />}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

}

Navbar.propTypes = {
  isUsuarioAutenticado: PropTypes.bool.isRequired,
  setIsUsuarioAutenticado: PropTypes.func.isRequired,
};

export default Navbar;
