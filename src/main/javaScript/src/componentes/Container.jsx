import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        position: 'relative',
        minWidth: '515px'
      }
    };
  }

  render() {
    return(
      <>
        {!this.props.tipo &&
          <div className={'container'}>
            {this.props.children}
          </div>
        }
        {this.props.tipo === 'bsDocs' &&
          <div className={'container'}>
            <Row>
              <div className={'col-md-12'} style={this.state.style}>
                <div className={'bs-docs-section'}>
                  {this.props.children}
                </div>
              </div>
            </Row>
          </div>
        }
      </>
    );
  }

}

Container.propTypes = {
  tipo: PropTypes.string,
};

export default Container;
