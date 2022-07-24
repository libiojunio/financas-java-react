import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import '../css/custom/custom.css'
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
