import ApiServices from '../outros/ApiServices';
import LocalStorageService from '../outros/LocalStorageService';
import ErroValidacao from '../exception/ErroValidacao';
import {_USUARIO_LOGADO} from '../../utils/constantes';

class LancamentoService extends ApiServices {
  constructor() {
    super('api/lancamentos');
  }

  validarFormularioLancamento(formulario){
    const erros = [];
    const texto = 'Informe ';

    if (!formulario.descricao) {
      erros.push(`${texto} a descrição`);
    }

    if (!formulario.valor) {
      erros.push(`${texto} o valor`);
    }

    if (!formulario.mes) {
      erros.push(`${texto} o mês`);
    }

    if (!formulario.ano) {
      erros.push(`${texto} o ano`);
    }

    if (!formulario.tipo) {
      erros.push(`${texto} o tipo`);
    }

    if (!formulario.status) {
      erros.push(`${texto} o status`);
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  obterSaldo(id){
    return this.get(`/${id}/saldo`);
  }

  buscar(formulario){
    const usuario = `?usuario=${LocalStorageService.getItemObj(_USUARIO_LOGADO).id}`;
    const mes = formulario.mes ? `&mes=${formulario.mes}` : '';
    const ano = formulario.ano ? `&ano=${formulario.ano}` : '';
    const tipo = formulario.tipo ? `&tipo=${formulario.tipo}` : '';
    const descricao = formulario.descricao ? `&descricao=${formulario.descricao}` : '';

    return this.get(`/${usuario}${mes}${ano}${descricao}${tipo}`);
  }

  buscarLancamentoId(id){
    const usuario = `?usuarioId=${LocalStorageService.getItemObj(_USUARIO_LOGADO).id}`;
    return this.get(`/buscarLancamentoId/${usuario}&lancamentoId=${id}`);
  }

  salvar(lancamento){
    return this.post('/', lancamento);
  }

  editar(lancamento){
    return this.put(`/${lancamento.id}`, lancamento);
  }

  atualizarStatus(lancamento, status){
    return this.put(`/${lancamento.id}/atualizarStatus`, {status});
  }

  deletar(url) {
    return this.delete(url);
  }
}

export default LancamentoService;
