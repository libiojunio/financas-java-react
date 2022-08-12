import LocalStorageService from '../outros/LocalStorageService';
import {_USUARIO_LOGADO} from '../../utils/constantes';

class AuthService {

  static isUsuarioAutenticado(){
    const usuario = LocalStorageService.getItemObj(_USUARIO_LOGADO);
    return !!(usuario && usuario.id);
  }

  static limparDadosUsuarioLogado(){
    localStorage.removeItem(_USUARIO_LOGADO);
  }

}

export default AuthService;
