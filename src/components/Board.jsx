import PropTypes from 'prop-types';
import React from 'react';

import Cell from './Cell';

import './Board.scss';

/**
 * Board component - used for board rendering.
 *
 * @param {*} { board, clickCell } props given to component
 * @returns JSX structure
 */
function Board({ board, clickCell }) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {
          board.map((row, y) => (
            <div key={y} className="row">
              {
                row.map((cell, x) => (
                  <Cell key={x} value={board[y][x]} position={{ x, y }} clickCell={clickCell} />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  clickCell: PropTypes.func.isRequired,
};

export default Board;
