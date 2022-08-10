import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        margin: '0 5px 0 0'
      }
    };
  }

  render() {
    const style = this.props.style || this.state.style;
    return(
      <button className={this.props.className} onClick={this.props.onClick} style={style}
              title={this.props.title} disabled={this.props.disabled}>
        {this.props.descricao}
      </button>
    );
  }
}

Button.propTypes = {
  descricao: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
