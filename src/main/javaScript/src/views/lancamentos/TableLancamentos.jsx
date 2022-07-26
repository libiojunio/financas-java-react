import React from 'react';
import PropTypes from 'prop-types';

class TableLancamentos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rows = this.props.lancamentos.map((lancamento) => {
      return (
        <tr key={lancamento.id}>
          <td>{lancamento.descricao}</td>
          <td>{lancamento.valor}</td>
          <td>{lancamento.tipo}</td>
          <td>{lancamento.mes}</td>
          <td>{lancamento.statusLancamento}</td>
        </tr>
      );
    })

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
    )
  }
}

TableLancamentos.propTypes = {
  lancamentos: PropTypes.array.isRequired,
};

export default TableLancamentos;
