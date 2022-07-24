import ApiServices from '../ApiServices';

class UsuarioService extends ApiServices {
  constructor() {
    super('api/usuarios');
  }
  
  autenticar(emailSenha){
    return this.post('/autenticar', emailSenha);
  }
}

export default UsuarioService;
