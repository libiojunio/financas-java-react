import ApiServices from '../outros/ApiServices';
import LocalStorageService from '../outros/LocalStorageService';

class LancamentoService extends ApiServices {
  constructor() {
    super('api/lancamentos');
  }

  obterSaldo(id){
    return this.get(`/${id}/saldo`);
  }

  buscar(formulario){
    const usuario = `?usuario=${LocalStorageService.getItemObj('_usuario_logado').id}`;
    const mes = formulario.mes ? `&mes=${formulario.mes}` : '';
    const ano = formulario.ano ? `&ano=${formulario.ano}` : ''
    const tipo = formulario.tipo ? `&tipo=${formulario.tipo}` : ''
    const descricao = formulario.descricao ? `&descricao=${formulario.descricao}` : '';

    return this.get(`/${usuario}${mes}${ano}${descricao}${tipo}`);
  }

  buscarLancamentoId(id){
    const usuario = `?usuarioId=${LocalStorageService.getItemObj('_usuario_logado').id}`;
    return this.get(`/buscarLancamentoId/${usuario}&lancamentoId=${id}`);
  }

  salvar(lancamento){
    return this.post('/', lancamento)
  }

  deletar(url) {
    return this.delete(url);
  }
}

export default LancamentoService;
