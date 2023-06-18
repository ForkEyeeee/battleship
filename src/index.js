import './styles/main.css';
import GameBoard from './gameBoard';
import Ship from './ship';
import Player from './player';
import { generatePlayerShips, buildGameBoard } from './modifyDOM';
// const test = new Player('jeff');

document.addEventListener("DOMContentLoaded", function() {
  buildGameBoard();
});


generatePlayerShips();
