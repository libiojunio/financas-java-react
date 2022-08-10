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
      <li className="nav-item">
        <Link className="nav-link" to={this.props.href}>{this.props.label}</Link>
      </li>
    );
  }

}

NavbarItem.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavbarItem;
