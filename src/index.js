import './styles/main.css';
import GameBoard from './gameBoard';
import Ship from './ship';
import Player from './player';

// const newShip = new Ship(3);
// test.placeShip([2, 2], 'horizontal', 1).length;
// test.placeShip([7, 4], 'vertical', 1).length;
// test.receiveAttack([2, 2]);
// test.receiveAttack([7, 4])
// console.log(test.receiveAttack([6, 2]));
// test.placeShip([3, 3], 'vertical', 1).length;
// console.log(test.receiveAttack([3, 3]));
// const objFive = GameBoard();
// objFive.placeShip([2, 2], 'vertical', 3);
// objFive.receiveAttack([2, 2]);
// objFive.receiveAttack([2, 3]);
// objFive.receiveAttack([2, 4]);

// console.log(objFive.isAllShipsSunk())

// const test = new Player('jeff');
// console.log(test);

const test2 = new GameBoard()
console.log(test2)

// console.log(test.playerGameBoard)
// test.GameBoard.placeShip([2, 2], 'horizontal', 2, test.GameBoard.enemyGameBoard)
// test.GameBoard.placeShip([4, 3], 'horizontal', 2, test.GameBoard.enemyGameBoard);
// test.GameBoard.placeShip([3, 5], 'horizontal', 2, test.GameBoard.enemyGameBoard);
// test.GameBoard.receiveAttack([2, 2], test.GameBoard.enemyGameBoard);
// test.GameBoard.receiveAttack([4, 3], test.GameBoard.enemyGameBoard);
// test.GameBoard.receiveAttack([3, 5], test.GameBoard.enemyGameBoard);
// test.GameBoard.receiveAttack([7, 2], test.GameBoard.enemyGameBoard);
// test.GameBoard.receiveAttack([1, 0], test.GameBoard.enemyGameBoard);


// test.GameBoard.playerGameBoard[24].ship.hit()
// test.GameBoard.receiveAttack([2, 2], test.GameBoard.enemyGameBoard);
// console.log(test);
// test.playerGameBoard.receiveAttack([2, 2])
test2.isAllShipsSunk(test2.enemyGameBoard.gameBoard)