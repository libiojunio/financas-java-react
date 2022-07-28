import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import {Dialog} from 'primereact/dialog';

class DialogSimNao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFooter = () => {
    return (
      <>
        <Button onClick={() => {this.props.simFunc}} descricao={'Sim'} className={'btn btn-danger'} />
        <Button onClick={() => {this.props.naoFunc}} descricao={'Não'} className={'btn btn-info'} />
      </>)
  }

  render() {
    return(
      <Dialog header={this.props.header} footer={this.renderFooter} visible={this.props.visible} onHide={this.props.visible}>
        {this.props.children}
      </Dialog>
    )
  }
}

DialogSimNao.propTypes = {
  visible: PropTypes.bool.isRequired,
  header: PropTypes.string,
  simFunc: PropTypes.func.isRequired,
  naoFunc: PropTypes.func.isRequired,
};

export default DialogSimNao;
