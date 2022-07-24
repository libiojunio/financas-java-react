import ApiServices from '../outros/ApiServices';

class LancamentoService extends ApiServices {
  constructor() {
    super('api/lancamentos');
  }

  obterSaldo(id){
    return this.get(`/${id}/saldo`);
  }
}

export default LancamentoService;