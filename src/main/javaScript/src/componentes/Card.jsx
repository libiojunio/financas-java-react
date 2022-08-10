import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={'card mb-3'}>
        <h3 className={'card-header'}>{this.props.titulo}</h3>
        <div className={'card-body'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  titulo: PropTypes.string
};

export default Card;
