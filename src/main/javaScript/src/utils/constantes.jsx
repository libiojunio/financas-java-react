export const STYLE_LINK = {
  color: 'white',
  textDecoration: 'none'
};

export const MARGIN_RIGHT_5PX = {
  'marginRight': '5px'
};

export const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/;

export const ROTA_HOME = '/';
export const ROTA_CADASTRO_USUARIOS = '/cadastro-usuarios';
export const ROTA_CONSULTA_LANCAMENTOS = '/consulta-lancamentos';
export const ROTA_CADASTRO_LANCAMENTOS = '/cadastro-lancamentos';
export const ROTA_LOGIN = '/login';

export const GO_BACK = -1;

export const GET_LISTA_ANOS = (anoInicial = 1970, final) => {
  const ano = [];
  const anoFinal = final ? final : new Date().getFullYear() + 20;
  for(let i = anoInicial; i < anoFinal; i++) {
    ano.push({
      id: i,
      descricao: i
    });
  }
  return ano;
};

export const GET_LISTA_OBJETO_MESES = [
  {id: 1, descricao: 'Janeiro'},
  {id: 2, descricao: 'Feverreiro'},
  {id: 3, descricao: 'Março'},
  {id: 4, descricao: 'Abril'},
  {id: 5, descricao: 'Maio'},
  {id: 6, descricao: 'Junho'},
  {id: 7, descricao: 'Julho'},
  {id: 8, descricao: 'Agosto'},
  {id: 9, descricao: 'Setembro'},
  {id: 10, descricao: 'Outubro'},
  {id: 11, descricao: 'Novembro'},
  {id: 12, descricao: 'Dezembro'},
];

export const TIPO_LANCAMENTO = [
  {id: 'DESPESA', descricao: 'Despesa'},
  {id: 'RECEITA', descricao: 'Receita'},
];

export const STATUS = [
  {id: 'CANCELADO', descricao: 'Cancelado'},
  {id: 'EFETIVADO', descricao: 'Efetivado'},
  {id: 'PENDENTE', descricao: 'Pendente'},
];

// eslint-disable-next-line no-underscore-dangle
export const _USUARIO_LOGADO = '_usuario_logado';
