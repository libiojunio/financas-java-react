import ApiServices from '../outros/ApiServices';
import ErroValidacao from '../exception/ErroValidacao';
import {REGEX_EMAIL} from '../../utils/constantes';
import {
  MSG_ERRO_EMAIL_FORMATO_INVALIDO,
  MSG_ERRO_SENHA_MINIMOS_CARACTERES,
  MSG_ERRO_SENHAS_NAO_SAO_IGUAIS
} from '../../utils/mensagens';

class UsuarioService extends ApiServices {
  constructor() {
    super('api/usuarios');
  }

  validarFormularioUsuario(formulario){
    const erros = [];
    const texto = 'Informe ';

    if (!formulario.nome) {
      erros.push(`${texto} o nome`);
    }

    if (!formulario.email) {
      erros.push(`${texto} o email`);
    }

    if (!formulario.senha) {
      erros.push(`${texto} a senha`);
    }

    if (!formulario.senhaRepeticao) {
      erros.push('Repita a senha');
    }

    if (!formulario.email.match(REGEX_EMAIL)) {
      erros.push(MSG_ERRO_EMAIL_FORMATO_INVALIDO);
    }

    if (formulario.senha.length <= 3) {
      erros.push(MSG_ERRO_SENHA_MINIMOS_CARACTERES);
    }

    if (formulario.senha !== formulario.senhaRepeticao) {
      erros.push(MSG_ERRO_SENHAS_NAO_SAO_IGUAIS);
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  autenticar(emailSenha){
    return this.post('/autenticar', emailSenha);
  }

  salvar(usuario){
    return this.post('/', usuario);
  }
}

export default UsuarioService;
