import React from 'react';
import { render } from 'react-dom';

import Game from './components/Game';

import './main.scss';

const wrapper = document.getElementById('app');

render(<Game />, wrapper);
