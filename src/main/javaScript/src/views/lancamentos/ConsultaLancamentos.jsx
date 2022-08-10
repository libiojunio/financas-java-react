import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/Form/FormGroup';
import Button from '../../componentes/Button';
import {
  GET_LISTA_ANOS,
  GET_LISTA_OBJETO_MESES, ROTA_CADASTRO_LANCAMENTOS,
  TIPO_LANCAMENTO
} from '../../utils/constantes';
import {withRouter} from '../../componentes/withRouter';
import {exibirMensagemErro, exibirMensagemErroApi, exibirMensagemSucesso} from '../../componentes/toastr';
import {
  MSG_ERRO_CAMPOS_VAZIOS, MSG_LANCAMENTO_STATUS_ATUALIZADO_COM_SUCESSO, MSG_SUCCESS_PADRAO,
} from '../../utils/mensagens';
import {formatarArrayDeStrings} from '../../utils/metodos';
import LancamentoService from '../../services/lancamento/LancamentoService';
import Row from '../../componentes/Row';
import FormSelect from '../../componentes/Form/FormSelect';
import TableLancamentos from './TableLancamentos';
import DialogSimNao from '../../componentes/DialogSimNao';

class ConsultaLancamentos extends React.Component {

  lancamentoService = new LancamentoService();

  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      formulario: {
        ano: now.getFullYear(),
        mes: now.getMonth() + 1,
        tipo: '',
        descricao: '',
      },
      lancamento: {},
      lancamentos: [{}],
      visible: false,
    };
  }

  componentDidMount() {
    this.buscar();
  }

  rotaCadastrarLancamento = () => {
    this.props.navigate(ROTA_CADASTRO_LANCAMENTOS);
  };

  rotaEditarLancamento = (lancamento) => {
    this.props.navigate(`${ROTA_CADASTRO_LANCAMENTOS}/${lancamento.id}`);
  };

  buscar = () => {
    const msgError = this.validarFormulario();
    if (msgError) {
      return exibirMensagemErro(msgError);
    }
    this.lancamentoService.buscar(this.state.formulario).then((response) => {
      exibirMensagemSucesso(MSG_SUCCESS_PADRAO);
      this.setState({lancamentos: response.data});
    }).catch((error) => {
      exibirMensagemErroApi(error);
    });
  };

  abrirModal = (lancamento) => {
    this.setState({visible: true, lancamento});
  };

  visibleFalse = () => {
    this.setState({visible: false});
  };

  deletar = () => {
    this.lancamentoService.deletar(`/${this.state.lancamento.id}`).then(() => {
      const index = this.state.lancamentos.indexOf(this.state.lancamento);
      const state = this.state;
      state.lancamentos.splice(index, 1);
      this.setState(state);
      exibirMensagemSucesso(MSG_SUCCESS_PADRAO);
    }).catch((error) => {
      exibirMensagemErroApi(error);
    });
    this.visibleFalse();
  };

  atualizarStatus = (lancamento, status) => {
    this.lancamentoService.atualizarStatus(lancamento, status).then(() => {
      const index = this.state.lancamentos.indexOf(lancamento);
      const lancamentos = this.state.lancamentos;
      lancamentos[index].statusLancamento = status;
      this.setState({lancamentos});
      exibirMensagemSucesso(MSG_LANCAMENTO_STATUS_ATUALIZADO_COM_SUCESSO());
    }).catch((error) => {
      exibirMensagemErroApi(error);
    });
  };

  onChange = (value) => {
    const state = this.state;
    state.formulario[value.target.id] = value.target.value;
    this.setState(state);
  };

  validarFormulario = () => {
    const camposVazios = [];
    const { formulario } = this.state;

    if (!formulario.ano) {
      camposVazios.push('Ano');
    }

    if (camposVazios.length > 0) {
      return MSG_ERRO_CAMPOS_VAZIOS(formatarArrayDeStrings(camposVazios));
    }

    return false;
  };

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
              <FormGroup label={'Ano:*'} htmlFor={idAno}>
                <FormSelect campoVazio defaultValue={this.state.formulario.ano} id={idAno} itens={GET_LISTA_ANOS()} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup label={'Mês:'} htmlFor={idMes}>
                <FormSelect campoVazio defaultValue={this.state.formulario.mes} id={idMes} itens={GET_LISTA_OBJETO_MESES} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup label={'Tipo:'} htmlFor={idTipo}>
                <FormSelect campoVazio defaultValue={this.state.formulario.tipo} id={idTipo} itens={TIPO_LANCAMENTO} onChange={this.onChange}/>
              </FormGroup>
              <FormGroup label={'Descrição:'} htmlFor={idDescricao}>
                <input
                  type="text" className="form-control" id={idDescricao} name={idDescricao} onChange={this.onChange}
                  placeholder="Digite a descrição" value={this.state.formulario.descricao} />
              </FormGroup>
              <Button title={'Buscar'} descricao={<i className={'pi pi-search-plus'}> Buscar</i>} className={'btn btn-success'} onClick={this.buscar} />
              <Button title={'Cadastrar'} descricao={<i className={'pi pi-plus'}> Cadastrar</i>} className={'btn btn-warning'} onClick={this.rotaCadastrarLancamento}/>
            </Container>
          </Row>
          <Row>
            <Container>
              <TableLancamentos cancelar={this.atualizarStatus} efetivar={this.atualizarStatus}
                                lancamentos={this.state.lancamentos} deletar={this.abrirModal} editar={this.rotaEditarLancamento}/>
            </Container>
          </Row>
        </Card>
        <DialogSimNao visible={this.state.visible} simFunc={this.deletar} onHide={this.visibleFalse} style={{width: '50%'}} >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h4>Confirma a exclusão do lancamento '{this.state.lancamento.descricao}' ?</h4>
        </DialogSimNao>
      </Container>
    );
  }
}

export default withRouter(ConsultaLancamentos);
