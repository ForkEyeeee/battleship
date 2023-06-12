import Ship from './ship';

class GameBoard {
  constructor() {
    this.gameBoard = this.generateGameBoard();
  }

  generateGameBoard() {
    const arr = [];
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        arr.push({ coordinate: [i, j], isPlaced: false });
      }
    }
    return arr;
  }

  placeShip([x, y]) {
    // find the object value that has x,y , then set its isplaced value to true
  }
}

export default GameBoard;
