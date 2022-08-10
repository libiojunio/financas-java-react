import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/Form/FormGroup';
import Button from '../../componentes/Button';
import {ROTA_LOGIN} from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import UsuarioService from '../../services/usuario/UsuarioService';
import {exibirMensagemErro, exibirMensagemErroApi, exibirMensagemSucesso} from '../../componentes/toastr';
import {
  MSG_USUARIO_CADASTRADO_COM_SUCESSO
} from '../../utils/mensagens';

class Cadastro extends React.Component {

  usuarioService = new UsuarioService();

  constructor(props) {
    super(props);
    this.state = {
      formulario: {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
      },
      style: {
        position: 'relative',
        left: '300px'
      }
    };
  }

  salvar = () => {
    try {
      this.usuarioService.validarFormularioUsuario(this.state.formulario);
      this.usuarioService.salvar(this.state.formulario).then(() => {
        exibirMensagemSucesso(MSG_USUARIO_CADASTRADO_COM_SUCESSO(this.state.formulario.nome));
        this.props.navigate(ROTA_LOGIN);
      }).catch((error) => {
        exibirMensagemErroApi(error);
      });
    }
    catch (e) {
      e.mensagens.forEach(msg => exibirMensagemErro(msg));
    }
  };

  onChange = (value) => {
    const state = this.state;
    state.formulario[value.target.id] = value.target.value;
    this.setState(state);
  };

  rotaLogin = () => {
    this.props.navigate(ROTA_LOGIN);
  };

  render() {
    const idNome = 'nome';
    const idEmail = 'email';
    const idSenha = 'senha';
    const idSenhaRepeticao = 'senhaRepeticao';

    return (
      <Container tipo={'bsDocs'}>
        <Card titulo={'Cadastro de usuário'}>
          <FormGroup label={'Nome: *'} htmlFor={idNome}>
            <input
              type="text" className="form-control" id={idNome} name={'nome'} onChange={this.onChange}
              placeholder="Digite o nome" value={this.state.formulario.nome} />
          </FormGroup>
          <FormGroup label={'Email: *'} htmlFor={idEmail}>
            <input
              type="email" className="form-control" id={idEmail} name={'email'} onChange={this.onChange}
              aria-describedby="emailHelp" placeholder="Digite o email" value={this.state.formulario.email} />
          </FormGroup>
          <FormGroup label={'Senha: *'} htmlFor={idEmail}>
            <input
              type="password" className="form-control" id={idSenha} name={'senha'} onChange={this.onChange}
              placeholder="Digite a senha" value={this.state.formulario.senha} />
          </FormGroup>
          <FormGroup label={'Repitir a senha: *'} htmlFor={idSenhaRepeticao}>
            <input
              type="password" className="form-control" id={idSenhaRepeticao} name={'senhaRepeticao'} onChange={this.onChange}
              placeholder="Digite a senha novamente" value={this.state.formulario.senhaRepeticao} />
          </FormGroup>
          <Button descricao={<i className={'pi pi-save'}> Salvar</i>} title={'Salvar'} className={'btn btn-success'} onClick={this.salvar} />
          <Button descricao={<i className={'pi pi-times'}> Cancelar</i>} title={'Cancelar'} className={'btn btn-danger'} onClick={this.rotaLogin} />
        </Card>
      </Container>
    );
  }
}

export default withRouter(Cadastro);
