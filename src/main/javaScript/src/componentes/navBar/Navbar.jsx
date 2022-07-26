import React from 'react';
import NavbarItem from './NavbarItem';
import {ROTA_CADASTRO_USUARIOS, ROTA_CONSULTA_LANCAMENTOS, ROTA_LOGIN} from '../../utils/constantes';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <>
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
            <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav">
                <NavbarItem href={'/'} label={'Home'} />
                <NavbarItem href={ROTA_CADASTRO_USUARIOS} label={'Usuários'} />
                <NavbarItem href={ROTA_CONSULTA_LANCAMENTOS} label={'Lançamentos'} />
                <NavbarItem href={ROTA_LOGIN} label={'Login'} />
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Navbar;
