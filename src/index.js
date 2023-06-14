import './styles/main.css';
import GameBoard from './gameBoard';
import Ship from './ship';

const test = new GameBoard();
const newShip = new Ship();
console.log(test.placeShip([2, 2], 'horizontal', 3).length);
// console.log(test.receiveAttack([2, 2], newShip));
