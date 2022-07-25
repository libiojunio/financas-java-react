import ApiServices from '../outros/ApiServices';

class UsuarioService extends ApiServices {
  constructor() {
    super('api/usuarios');
  }

  autenticar(emailSenha){
    return this.post('/autenticar', emailSenha);
  }

  salvar(usuario){
    return this.post('/', usuario)
  }
}

export default UsuarioService;
