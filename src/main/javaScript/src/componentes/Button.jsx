import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ROTA_CONSULTA_LANCAMENTOS, STYLE_LINK} from '../utils/constantes';

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
      this.props.link ?
        <Link style={STYLE_LINK} to={this.props.link}>
          <button className={this.props.className} onClick={this.props.onClick} style={style}>
            {this.props.descricao}
          </button>
        </Link> :
      <button className={this.props.className} onClick={this.props.onClick} style={style}>
        {this.props.descricao}
      </button>
    )
  }
}

Button.propTypes = {
  descricao: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
};

export default Button;
