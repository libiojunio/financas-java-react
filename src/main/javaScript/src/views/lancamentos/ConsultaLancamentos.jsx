import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/Form/FormGroup';
import Button from '../../componentes/Button';
import {Link} from 'react-router-dom';
import {
  ANO_SELECT,
  MESES_SELECT,
  REGEX_EMAIL,
  ROTA_HOME,
  ROTA_LOGIN,
  STYLE_LINK,
  TIPO_LANCAMENTO
} from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import UsuarioService from '../../services/usuario/UsuarioService';
import {exibirMensagemErro, exibirMensagemErroApi, exibirMensagemSucesso} from '../../componentes/toastr';
import {
  MSG_ERRO_CAMPOS_VAZIOS,
  MSG_ERRO_EMAIL_FORMATO_INVALIDO,
  MSG_ERRO_SENHA_MINIMOS_CARACTERES,
  MSG_ERRO_SENHAS_NAO_SAO_IGUAIS,
  MSG_USUARIO_AUTENTICADO_COM_SUCESSO,
  MSG_USUARIO_CADASTRADO_COM_SUCESSO
} from '../../utils/mensagens';
import {formatarArrayDeStrings} from '../../utils/metodos';
import LancamentoService from '../../services/lancamento/LancamentoService';
import Row from '../../componentes/Row';
import LocalStorageService from '../../services/outros/LocalStorageService';
import FormSelect from '../../componentes/Form/FormSelect';

class ConsultaLancamentos extends React.Component {

  lancamentoService = new LancamentoService();

  constructor(props) {
    super(props);
    this.state = {
      formulario: {
        ano: new Date().getFullYear(),
        mes: new Date().getMonth(),
        tipo: '',
        descricao: '',
      }
    };
  }

  buscar = () => {
    this.lancamentoService.buscar(this.state.formulario).then((response) => {
      console.log('response.data', response.data);
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
    const idTipo = 'tipo';
    const idAno = 'ano';
    const idMes = 'mes';
    const idDescricao = 'descricao';

    return (
      <Container tipo={'bsDocs'}>
        <Card titulo={'Consultar lançamentos'}>
          <Row>
            <Container>
              <FormGroup label={'Ano:'} htmlFor={idAno}>
                <FormSelect defaultValue={this.state.formulario.ano} id={idAno} itens={ANO_SELECT()} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup label={'Mês:'} htmlFor={idMes}>
                <FormSelect defaultValue={this.state.formulario.mes} id={idMes} itens={MESES_SELECT} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup label={'Tipo:'} htmlFor={idTipo}>
                <FormSelect defaultValue={this.state.formulario.tipo} id={idTipo} itens={TIPO_LANCAMENTO} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup label={'Descrição:'} htmlFor={idDescricao}>
                <input
                  type="text" className="form-control" id={idDescricao} name={idDescricao} onChange={this.onChange}
                  placeholder="Digite a descrição" value={this.state.formulario.descricao} />
              </FormGroup>
              <Button descricao={'Buscar'} className={'btn btn-success'} onClick={this.buscar} />
            </Container>
          </Row>
        </Card>
      </Container>
    )
  }
}

export default withRouter(ConsultaLancamentos);
