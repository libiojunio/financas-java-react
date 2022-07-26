import React from 'react';
import PropTypes from 'prop-types';

class FormSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <select defaultValue={this.props.defaultValue} className="form-select" aria-label="Default select example"
              id={this.props.id} name={this.props.id} onChange={this.props.onChange}>
        <option value={null}></option>
        {this.props.itens.map((item) => {
          return <option value={item.id} key={item.id}>{item.descricao}</option>
        })}
      </select>
    )
  }
}

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.any.isRequired,
  itens: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default FormSelect;
