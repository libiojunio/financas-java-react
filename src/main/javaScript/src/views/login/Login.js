import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/FormGroup';
import Button from '../../componentes/Button';
import {Link} from 'react-router-dom';
import {styleLink, urlAutenticar} from '../../utils/constantes';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputSenha: '',
      style: {
        position: 'relative',
        left: '300px'
      }
    };
  }
  
  entrar = () => {
    axios.post(urlAutenticar, {
      email: this.state.inputEmail,
      senha: this.state.inputSenha
    }).then((response) => {
      console.log('response', response);
    }).catch((error) => {
      console.log('error', error.response);
    });
  }

  onChange = (value) => {
    const state = this.state;
    state[value.target.id] = value.target.value;
    this.setState(state);
  }

  render() {
    const idEmail = 'inputEmail';
    const idSenha = 'inputSenha';
    
    const descricaoCadastrar = <Link style={styleLink} to={'/cadastro-usuarios'}>Cadastrar</Link>;

    return (
      <Container tipo={'bsDocs'}>
         <Card titulo={'Login'}>
           <fieldset>
             <FormGroup label={'Email: *'} htmlFor={idEmail}>
               <input
                 type="email" className="form-control" id={idEmail} onChange={this.onChange}
                 aria-describedby="emailHelp" placeholder="Digite o email" value={this.state.inputEmail} />
             </FormGroup>
             <FormGroup label={'Senha: *'} htmlFor={idSenha}>
               <input
                 type="password" className="form-control" id={idSenha} onChange={this.onChange}
                 placeholder="Digite a senha" value={this.state.inputSenha}/>
             </FormGroup>
             <Button onClick={this.entrar} descricao={'Entrar'} className={'btn btn-success'}/>
             <Button descricao={descricaoCadastrar} className={'btn btn-danger'}/>
           </fieldset>
         </Card>
      </Container>
    )
  }
}

export default Login;
