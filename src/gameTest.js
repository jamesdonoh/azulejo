import { Game } from './game';
import { UI } from './ui';

const parentSelector = 'body',
    gridWidth = 3,
    gridHeight = 3;

var game = new Game(gridWidth, gridHeight);
window.ui = new UI(window.document, parentSelector, game);

ui.setupGrids();
ui.startGame();
