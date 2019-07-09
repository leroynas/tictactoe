import PropTypes from 'prop-types';
import React from 'react';

import './Button.scss';

/**
 * Button component - used for rendering buttons.
 *
 * @param {*} { text, action, disabled } props given to component
 * @returns JSX structure
 */
function Button({ text, action, disabled }) {
  return (
    <button className={`btn${disabled ? ' disabled' : ''}`} type="button" onClick={!disabled ? action : null}>{ text }</button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
