import PropTypes from 'prop-types';
import React from 'react';

import './Cell.scss';

/**
 * Cell component - used for rendering cells.
 *
 * @param {*} { value, position, clickCell } props given to component
 * @returns JSX structure
 */
function Cell({ value, position, clickCell }) {
  return (
    <button className={`cell ${value ? value.toLowerCase() : ''}`} type="button" onClick={!value ? clickCell.bind(null, position) : null}>{ value }</button>
  );
}

Cell.propTypes = {
  value: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  clickCell: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  value: '',
};

export default Cell;
