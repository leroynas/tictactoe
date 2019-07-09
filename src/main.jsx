import React from 'react';
import { render } from 'react-dom';

import Game from './components/Game';

import './main.scss';

// Load document wrapper element.
const wrapper = document.getElementById('app');

// Render game inside wrapper element.
render(<Game />, wrapper);
