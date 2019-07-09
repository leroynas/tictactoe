import React, { Component } from 'react';

import Board from './Board';
import Info from './Info';
import Button from './Button';

import { post } from '../core/fetch';

import './Game.scss';

/**
 * Game component - user for rendering game.
 *
 * @class Game
 * @extends {Component}
 */
class Game extends Component {
  /**
   * Creates an instance of Game with required bindings.
   * @memberof Game
   */
  constructor() {
    super();

    this.state = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      steps: [],
      turnX: true,
      winner: null,
      saved: false,
    };

    this.handleClickCell = this.clickCell.bind(this);
    this.handleRestart = this.restart.bind(this);
    this.handleStepBack = this.stepBack.bind(this);
    this.handleSaveGame = this.saveGame.bind(this);
  }

  /**
   * clickCell method handles cell clicks. Manipulates state for rerendering.
   *
   * @param {*} position position of clicked cell
   *
   * @memberof Game
   */
  clickCell(position) {
    const {
      board, steps, turnX, winner,
    } = this.state;
    if (winner) return;

    const { x, y } = position;

    board[y][x] = turnX ? 'X' : 'O';
    steps.push({
      isX: turnX,
      position,
    });

    this.setState({ board, turnX: !turnX });

    const result = this.calculateWinner();
    if (result) this.setState({ winner: result });
  }

  /**
   * restart method handles restart button. Resets state for rerendering.
   *
   * @memberof Game
   */
  restart() {
    this.setState({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      steps: [],
      turnX: true,
      winner: null,
      saved: false,
    });
  }

  /**
   * stepBack method handles step back button. Removes last step from state for
   * rerendering.
   *
   * @memberof Game
   */
  stepBack() {
    const { board, steps, turnX } = this.state;

    const lastStep = steps.pop();
    const { x, y } = lastStep.position;
    board[y][x] = null;

    this.setState({ steps, board, turnX: !turnX });
  }

  /**
   * calculateWinner method is used for checking winning positions. Returns
   * winner (X/O) or null.
   *
   * @returns string|null
   * @memberof Game
   */
  calculateWinner() {
    const { board } = this.state;
    let winner = null;

    const posibilities = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[2, 0], [1, 1], [0, 2]],
    ];

    posibilities.forEach((posibility) => {
      const [[ax, ay], [bx, by], [cx, cy]] = posibility;

      // Check if position is not null in board array (so must be filled).
      if (
        board[ay][ax]
        && board[ay][ax] === board[by][bx]
        && board[ay][ax] === board[cy][cx]
      ) {
        // Assign winner variable, use object from board. Board is
        // mutlidimensional array based on rows so y comes before x.
        winner = board[ay][ax];
      }
    });

    return winner;
  }

  /**
   * saveGame method is used for sending game data to API.
   *
   * @memberof Game
   */
  async saveGame() {
    const { steps } = this.state;
    const response = await post('/game/create', { steps });
    if (typeof response.gameid !== 'undefined') this.setState({ saved: true });
  }

  /**
   * render function for Game component.
   *
   * @returns JSX structure
   * @memberof Game
   */
  render() {
    const {
      board, turnX, winner, saved,
    } = this.state;

    return (
      <div className="game">
        <div className="actions">
          <Button text="restart" action={this.handleRestart} />
          <Button text="Step back" action={this.handleStepBack} disabled={!!winner} />
        </div>

        <div className="holder">
          <Board board={board} clickCell={this.handleClickCell} />

          <Info turnX={turnX} winner={winner} />
        </div>

        <div className="actions">
          <Button
            text={!saved ? 'save game' : 'saved'}
            action={this.handleSaveGame}
            disabled={!winner || saved}
          />
        </div>
      </div>
    );
  }
}

export default Game;
