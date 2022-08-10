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
        <Button onClick={this.props.simFunc} descricao={'Sim'} className={'btn btn-danger'} />
        <Button onClick={this.props.naoFunc || this.props.onHide} descricao={'Não'} className={'btn btn-info'} />
      </>);
  };

  render() {
    return(
      <Dialog style={this.props.style} header={this.props.header} footer={this.renderFooter} visible={this.props.visible} onHide={this.props.onHide}>
        {this.props.children}
      </Dialog>
    );
  }
}

DialogSimNao.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  header: PropTypes.string,
  simFunc: PropTypes.func.isRequired,
  naoFunc: PropTypes.func,
};

export default DialogSimNao;
