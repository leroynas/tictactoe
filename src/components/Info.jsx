import PropTypes from 'prop-types';
import React from 'react';

import './Info.scss';

/**
 * Info component - used for rendering info
 *
 * @param {*} { value, position, clickCell } props given to component
 * @returns JSX structure
 */
function Info({ winner, turnX }) {
  return (
    <div className="info">
      <div className="block">
        <span className="heading">Turn:</span>
        <span className={`content ${turnX ? 'x' : 'o'}`}>{ turnX ? 'X' : 'O' }</span>
      </div>

      <div className="block">
        <span className="heading">Winner:</span>
        <span className={`content ${winner ? winner.toLowerCase() : ''}`}>{ winner || '-' }</span>
      </div>
    </div>
  );
}

Info.propTypes = {
  turnX: PropTypes.bool.isRequired,
  winner: PropTypes.string,
};

Info.defaultProps = {
  winner: '-',
};

export default Info;
