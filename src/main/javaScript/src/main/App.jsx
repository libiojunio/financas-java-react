import React from 'react';
import 'toastr/build/toastr.min';
import 'bootswatch/dist/flatly/bootstrap.css';
import '../css/custom/custom.css';
import 'toastr/build/toastr.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Rotas from './rotas/Rotas';
import Container from '../componentes/Container';
import NavBar from '../componentes/navBar/Navbar';
import AuthService from '../services/authService/AuthService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsuarioAutenticado: AuthService.isUsuarioAutenticado(),
    };
  }

  setIsUsuarioAutenticado = () => {
    this.setState({isUsuarioAutenticado: AuthService.isUsuarioAutenticado()});
  };

  render() {
    return (
      <Container>
        <NavBar isUsuarioAutenticado={this.state.isUsuarioAutenticado}
                setIsUsuarioAutenticado={this.setIsUsuarioAutenticado} />
        <Rotas isUsuarioAutenticado={this.state.isUsuarioAutenticado}
               setIsUsuarioAutenticado={this.setIsUsuarioAutenticado}/>
      </Container>
    );
  }
}

export default App;
