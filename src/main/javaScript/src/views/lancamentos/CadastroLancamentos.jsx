import React from 'react';
import Container from '../../componentes/Container';
import {withRouter} from '../../componentes/withRouter';
import LancamentoService from '../../services/lancamento/LancamentoService';
import Row from '../../componentes/Row';
import FormGroup from '../../componentes/Form/FormGroup';
import FormSelect from '../../componentes/Form/FormSelect';
import {
  _USUARIO_LOGADO,
  GET_LISTA_ANOS,
  GET_LISTA_OBJETO_MESES,
  ROTA_CONSULTA_LANCAMENTOS,
  STATUS,
  TIPO_LANCAMENTO
} from '../../utils/constantes';
import Button from '../../componentes/Button';
import {
  MSG_LANCAMENTO_ATUALIZADO_COM_SUCESSO,
  MSG_LANCAMENTO_CADASTRADO_COM_SUCESSO,
} from '../../utils/mensagens';
import {exibirMensagemErro, exibirMensagemErroApi, exibirMensagemSucesso} from '../../componentes/toastr';
import LocalStorageService from '../../services/outros/LocalStorageService';
import Card from '../../componentes/Card';

const STYLE_BTN_SALVAR = {
  margin: '0px 5px 0px 13px'
};

class CadastroLancamentos extends React.Component {

  lancamentoService = new LancamentoService();

  constructor(props) {
    super(props);
    const now = new Date();
    // eslint-disable-next-line no-underscore-dangle
    const _usuario_logado = LocalStorageService.getItemObj(_USUARIO_LOGADO);
    this.state = {
      formulario: {
        id: null,
        ano: now.getFullYear(),
        mes: now.getMonth() + 1,
        tipo: 'RECEITA',
        status: 'PENDENTE',
        valor: '',
        descricao: '',
        usuario: _usuario_logado.id,
      },
    };
  }

  componentDidMount() {
    if (this.props.params.id){
      this.lancamentoService.buscarLancamentoId(this.props.params.id).then((lanc) => {
        const lancamento = lanc.data;
        this.setState({
          formulario: {
            id: lancamento.id,
            ano: lancamento.ano,
            mes: lancamento.mes,
            tipo: lancamento.tipo,
            status: lancamento.statusLancamento,
            valor: lancamento.valor,
            descricao: lancamento.descricao,
            usuario: lancamento.usuario.id,
          }
        });
      }).catch((error) => {
        exibirMensagemErroApi(error);
      });
    }
  }

  salvar = () => {
    try {
      this.lancamentoService.validarFormularioLancamento(this.state.formulario);
      if (this.props.params.id){
        this.lancamentoService.editar(this.state.formulario).then(() => {
          exibirMensagemSucesso(MSG_LANCAMENTO_ATUALIZADO_COM_SUCESSO());
          this.props.navigate(ROTA_CONSULTA_LANCAMENTOS);
        }).catch((error) => {
          exibirMensagemErroApi(error);
        });
      }
      else {
        this.lancamentoService.salvar(this.state.formulario).then(() => {
          exibirMensagemSucesso(MSG_LANCAMENTO_CADASTRADO_COM_SUCESSO());
          this.props.navigate(ROTA_CONSULTA_LANCAMENTOS);
        }).catch((error) => {
          exibirMensagemErroApi(error);
        });
      }
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

  rotaConsultarLancamento = () => {
    this.props.navigate(ROTA_CONSULTA_LANCAMENTOS);
  };

  render() {
    const idValor = 'valor';
    const idDescricao = 'descricao';
    const idTipo = 'tipo';
    const idStatus = 'status';
    const idAno = 'ano';
    const idMes = 'mes';
    const isCadastrando = !this.props.params.id;
    const tituloCard = isCadastrando ? 'Cadastrar' : 'Atualizar';
    const textoSalvarAlterar = this.props.params.id ? 'Alterar' : 'Salvar';

    return (
      <Container tipo={'bsDocs'}>
        <Card titulo={`${tituloCard} lançamentos`}>
          <Row>
            <FormGroup label={'Descrição: *'} htmlFor={idDescricao} className={'col-md-12'}>
              <input
                type="text" className="form-control" id={idDescricao} name={idDescricao} onChange={this.onChange}
                placeholder="Digite a descrição" value={this.state.formulario.descricao} />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup label={'Mês:*'} htmlFor={idMes} className={'col-md-6'}>
              <FormSelect defaultValue={this.state.formulario.mes} id={idMes} itens={GET_LISTA_OBJETO_MESES} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup label={'Ano:*'} htmlFor={idAno} className={'col-md-6'}>
              <FormSelect defaultValue={this.state.formulario.ano} id={idAno} itens={GET_LISTA_ANOS()} onChange={this.onChange} />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup label={'Valor: *'} htmlFor={idValor} className={'col-md-4'}>
              <input
                type="number" className="form-control" id={idValor} name={idValor} onChange={this.onChange}
                placeholder="Digite o valor" value={this.state.formulario.valor} />
            </FormGroup>
            <FormGroup label={'Tipo:*'} htmlFor={idTipo} className={'col-md-4'}>
              <FormSelect defaultValue={this.state.formulario.tipo} id={idTipo} itens={TIPO_LANCAMENTO} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup label={'Status:*'} htmlFor={idStatus} className={'col-md-4'}>
              <FormSelect disabled={isCadastrando} defaultValue={this.state.formulario.status}
                          id={idStatus} itens={STATUS} onChange={this.onChange}/>
            </FormGroup>
          </Row>
          <Row>
            <Button descricao={<i className={'pi pi-save'}> {textoSalvarAlterar}</i>} title={textoSalvarAlterar}
                    className={'btn btn-success col-md-1'} style={STYLE_BTN_SALVAR} onClick={this.salvar}  />
            <Button descricao={<i className={'pi pi-times'}> Cancelar</i>} title={'Cancelar'}
                    className={'btn btn-danger col-md-1'} onClick={this.rotaConsultarLancamento}/>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default withRouter(CadastroLancamentos);
