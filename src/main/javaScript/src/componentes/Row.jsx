import React from 'react';
import PropTypes from 'prop-types';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className={'row'} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

Row.propTypes = {
  style: PropTypes.object
};

export default Row;
