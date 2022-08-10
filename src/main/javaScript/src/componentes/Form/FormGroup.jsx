import React from 'react';
import PropTypes from 'prop-types';

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className={`form-group mb-3 ${this.props.className}`}>
        <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
}

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FormGroup;
