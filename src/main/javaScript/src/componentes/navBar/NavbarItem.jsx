import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NavbarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      this.props.show &&
      <li className="nav-item">
        <Link className="nav-link" to={this.props.href} onClick={this.props.onClick}>{this.props.label}</Link>
      </li>
    );
  }

}

NavbarItem.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  show: PropTypes.bool.isRequired,
};

export default NavbarItem;
