import PropTypes from 'prop-types';
import React from 'react';

import './Button.scss';

function Board({ text, action, disabled }) {
  return (
    <button className={`btn${disabled ? ' disabled' : ''}`} type="button" onClick={!disabled ? action : null}>{ text }</button>
  );
}

Board.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Board.defaultProps = {
  disabled: false,
};

export default Board;
