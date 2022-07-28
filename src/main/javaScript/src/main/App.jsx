import React from 'react';
import 'toastr/build/toastr.min'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../css/custom/custom.css'
import 'toastr/build/toastr.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Rotas from './rotas/Rotas';
import Container from '../componentes/Container';
import NavBar from '../componentes/navBar/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Rotas />
      </Container>
    );
  }
}

export default App;
