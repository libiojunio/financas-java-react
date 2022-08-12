import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/Form/FormGroup';
import Button from '../../componentes/Button';
import {_USUARIO_LOGADO, ROTA_CADASTRO_USUARIOS, ROTA_HOME} from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import usuarioService from '../../services/usuario/UsuarioService';
import LocalStorageService from '../../services/outros/LocalStorageService';
import {exibirMensagemErroApi, exibirMensagemSucesso} from '../../componentes/toastr';
import {MSG_USUARIO_AUTENTICADO_COM_SUCESSO} from '../../utils/mensagens';

class Login extends React.Component {

  usuarioService = new usuarioService();

  constructor(props) {
    super(props);
    this.state = {
      formulario: {
        email: '',
        senha: '',
      },
      style: {
        position: 'relative',
        left: '300px'
      }
    };
  }

  autenticar = () => {
    this.usuarioService.autenticar(this.state.formulario).then((response) => {
      LocalStorageService.setItem(_USUARIO_LOGADO, JSON.stringify(response.data));
      this.props.setIsUsuarioAutenticado();
      exibirMensagemSucesso(MSG_USUARIO_AUTENTICADO_COM_SUCESSO);
      this.props.navigate(ROTA_HOME);
    }).catch((error) => {
      exibirMensagemErroApi(error);
    });
  };

  onChange = (value) => {
    const state = this.state;
    state.formulario[value.target.id] = value.target.value;
    this.setState(state);
  };

  rotaCadastroUsuarios = () => {
    this.props.navigate(ROTA_CADASTRO_USUARIOS);
  };

  render() {
    const idEmail = 'email';
    const idSenha = 'senha';

    return (
      <Container tipo={'bsDocs'}>
         <Card titulo={'Login'}>
           <fieldset>
             <FormGroup label={'Email: *'} htmlFor={idEmail}>
               <input
                 type="email" className="form-control" id={idEmail} onChange={this.onChange}
                 aria-describedby="emailHelp" placeholder="Digite o email" value={this.state.formulario.email} />
             </FormGroup>
             <FormGroup label={'Senha: *'} htmlFor={idSenha}>
               <input
                 type="password" className="form-control" id={idSenha} onChange={this.onChange}
                 placeholder="Digite a senha" value={this.state.formulario.senha}/>
             </FormGroup>
             <Button descricao={<i className={'pi pi-save'}> Entrar</i>} title={'Entrar'}
                     onClick={this.autenticar} className={'btn btn-success'}/>
             <Button descricao={<i className={'pi pi-user-plus'}> Cadastrar</i>} title={'Cadastrar'}
                     className={'btn btn-danger'} onClick={this.rotaCadastroUsuarios}/>
           </fieldset>
         </Card>
      </Container>
    );
  }
}

export default withRouter(Login);
