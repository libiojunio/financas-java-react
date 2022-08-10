import React from 'react';
import PropTypes from 'prop-types';

class FormSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const campoVazio = this.props.campoVazio ? <option value={null}></option> : null;
    return(
      <select value={this.props.defaultValue} disabled={!!this.props.disabled}
              className="form-select" aria-label="Default select example"
              id={this.props.id} name={this.props.id} onChange={this.props.onChange}>
        {campoVazio}
        {this.props.itens.map((item) => {
          return <option value={item.id} key={item.id}>{item.descricao}</option>;
        })}
      </select>
    );
  }
}

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.any.isRequired,
  itens: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  campoVazio: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormSelect;
