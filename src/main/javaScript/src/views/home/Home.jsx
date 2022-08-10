import React from 'react';
import {Link} from 'react-router-dom';
import {
  _USUARIO_LOGADO,
  MARGIN_RIGHT_5PX,
  ROTA_CADASTRO_USUARIOS,
  ROTA_CONSULTA_LANCAMENTOS,
} from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import lancamentoService from '../../services/lancamento/LancamentoService';
import LocalStorageService from '../../services/outros/LocalStorageService';

class Home extends React.Component {

  lancamentoService = new lancamentoService();

  constructor(props) {
    super(props);
    this.state = {
      saldo: 0,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    const _usuario_logado = LocalStorageService.getItemObj(_USUARIO_LOGADO);
    if (_usuario_logado && _usuario_logado.id) {
      this.lancamentoService.obterSaldo(_usuario_logado.id).then((response) => {
        this.setState({saldo: response.data});
      });
    }
    else {
      this.setState({saldo: 0});
    }
  }

  render() {

    return (
      <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R${this.state.saldo}</p>
        <hr className="my-4"/>
        <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
        <p className="lead">
          <Link to={ROTA_CADASTRO_USUARIOS} style={MARGIN_RIGHT_5PX} className="btn btn-primary btn-lg" role="button">
            <i className={'pi pi-user-plus'}></i> Cadastrar Usuário
          </Link>
          <Link to={ROTA_CONSULTA_LANCAMENTOS} className="btn btn-danger btn-lg" role="button">
            <i className={'pi pi-plus'}></i> Cadastrar Lançamento
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Home);
