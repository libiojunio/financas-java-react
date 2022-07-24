import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/FormGroup';
import Button from '../../componentes/Button';
import {Link} from 'react-router-dom';
import {ROTA_HOME, STYLE_LINK } from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import usuarioService from '../../services/usuario/UsuarioService';
import LocalStorageService from '../../services/outros/LocalStorageService';
import {exibirMensagemErro, exibirMensagemSucesso} from '../../componentes/toastr';
import {USUARIO_AUTENTICADO_COM_SUCESSO} from '../../utils/mensagens';

class Login extends React.Component {

  usuarioService = new usuarioService();

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

  autenticar = () => {
    const emailSenha = {
      email: this.state.inputEmail,
      senha: this.state.inputSenha
    };
    this.usuarioService.autenticar(emailSenha).then((response) => {
      LocalStorageService.setItem('_usuario_logado', JSON.stringify(response.data))
      exibirMensagemSucesso(USUARIO_AUTENTICADO_COM_SUCESSO)
      this.props.navigate(ROTA_HOME)
    }).catch((error) => {
      exibirMensagemErro(error.response.data);
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

    const descricaoCadastrar = <Link style={STYLE_LINK} to={'/cadastro-usuarios'}>Cadastrar</Link>;

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
             <Button onClick={this.autenticar} descricao={'Entrar'} className={'btn btn-success'}/>
             <Button descricao={descricaoCadastrar} className={'btn btn-danger'}/>
           </fieldset>
         </Card>
      </Container>
    )
  }
}

export default withRouter(Login);
