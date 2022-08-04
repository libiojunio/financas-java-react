import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/Form/FormGroup';
import Button from '../../componentes/Button';
import {Link} from 'react-router-dom';
import {REGEX_EMAIL, ROTA_LOGIN, STYLE_LINK} from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import UsuarioService from '../../services/usuario/UsuarioService';
import {exibirMensagemErro, exibirMensagemErroApi, exibirMensagemSucesso} from '../../componentes/toastr';
import {
  MSG_ERRO_CAMPOS_VAZIOS,
  MSG_ERRO_EMAIL_FORMATO_INVALIDO, MSG_ERRO_SENHA_MINIMOS_CARACTERES, MSG_ERRO_SENHAS_NAO_SAO_IGUAIS,
  MSG_USUARIO_CADASTRADO_COM_SUCESSO
} from '../../utils/mensagens';
import {formatarArrayDeStrings} from '../../utils/metodos';

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

  validarFormulario = () => {
    const camposVazios = [];
    const { formulario } = this.state;

    if (!formulario.nome) {
      camposVazios.push('Nome')
    }

    if (!formulario.email) {
      camposVazios.push('Email')
    }

    if (!formulario.senha) {
      camposVazios.push('Senha')
    }

    if (!formulario.senhaRepeticao) {
      camposVazios.push('Repitir a senha')
    }

    if (camposVazios.length > 0) {
      return MSG_ERRO_CAMPOS_VAZIOS(formatarArrayDeStrings(camposVazios));
    }

    if (!formulario.email.match(REGEX_EMAIL)) {
      return MSG_ERRO_EMAIL_FORMATO_INVALIDO
    }

    if (formulario.senha.length <= 3) {
      return MSG_ERRO_SENHA_MINIMOS_CARACTERES
    }

    if (formulario.senha !== formulario.senhaRepeticao) {
      return MSG_ERRO_SENHAS_NAO_SAO_IGUAIS
    }

    return false;
  }

  salvar = () => {
    const msgError = this.validarFormulario();
    if (msgError) {
      return exibirMensagemErro(msgError);
    }
    this.usuarioService.salvar(this.state.formulario).then(() => {
      exibirMensagemSucesso(MSG_USUARIO_CADASTRADO_COM_SUCESSO(this.state.formulario.nome))
      this.props.navigate(ROTA_LOGIN);
    }).catch((error) => {
      exibirMensagemErroApi(error)
    });
  }

  onChange = (value) => {
    const state = this.state;
    state.formulario[value.target.id] = value.target.value;
    this.setState(state);
  }

  render() {
    const idNome = 'nome';
    const idEmail = 'email';
    const idSenha = 'senha';
    const idSenhaRepeticao = 'senhaRepeticao';

    const descricaoCancelar = <Link style={STYLE_LINK} to={ROTA_LOGIN}>Cancelar</Link>;

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
          <Button descricao={'Salvar'} className={'btn btn-success'} onClick={this.salvar} />
          <Button descricao={descricaoCancelar} className={'btn btn-danger'} />
        </Card>
      </Container>
    )
  }
}

export default withRouter(Cadastro);
