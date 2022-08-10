import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import {GET_LISTA_OBJETO_MESES} from '../../utils/constantes';
import Button from '../../componentes/Button';

class TableLancamentos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rows = this.props.lancamentos.map((lancamento) => {
      let mes = {};
      if (lancamento.mes) {
        mes = GET_LISTA_OBJETO_MESES.filter((mes) => {
          return mes.id === lancamento.mes;
        })[0];
      }
      return (
        <tr key={lancamento.id}>
          <td>{lancamento.descricao}</td>
          <td>{lancamento.valor ? `R$ ${currencyFormatter.format(lancamento.valor, {locale: 'pt:BR'})}` : ''}</td>
          <td>{lancamento.tipo}</td>
          <td>{mes.descricao}</td>
          <td>{lancamento.statusLancamento}</td>
          {lancamento.id &&
            <td>
              <Button descricao={<i className={'pi pi-check'}></i>} className={'btn btn-success'}
                      onClick={() => {
                        this.props.efetivar(lancamento, 'EFETIVADO');
                      }} title={'Efetivar'} disabled={lancamento.statusLancamento === 'EFETIVADO'} />

              <Button descricao={<i className={'pi pi-times'}></i>} className={'btn btn-secondary'}
                      onClick={() => {
                        this.props.cancelar(lancamento, 'CANCELADO');
                      }} title={'Cancelar'} disabled={lancamento.statusLancamento === 'CANCELADO'} />

              <Button descricao={<i className={'pi pi-pencil'}></i>} className={'btn btn-warning'}
                      onClick={() => {
                        this.props.editar(lancamento);
                      }} title={'Editar'} />

              <Button descricao={<i className={'pi pi-trash'}></i>} className={'btn btn-danger'}
                      onClick={() => {
                        this.props.deletar(lancamento);
                      }} title={'Excluir'} />
            </td>}
        </tr>
      );
    });

    return (
     <table className={'table table-hover'}>
       <thead>
         <tr>
           <th>Descrição</th>
           <th>Valor</th>
           <th>Tipo</th>
           <th>Mês</th>
           <th>Situação</th>
           <th>Ações</th>
         </tr>
       </thead>
       <tbody>
        {rows}
       </tbody>
     </table>
    );
  }
}

TableLancamentos.propTypes = {
  lancamentos: PropTypes.array.isRequired,
  deletar: PropTypes.func.isRequired,
  editar: PropTypes.func.isRequired,
  cancelar: PropTypes.func.isRequired,
  efetivar: PropTypes.func.isRequired,
};

export default TableLancamentos;
