import Ship from './ship';

class GameBoard {
  constructor() {
    this.gameBoard = this.generateGameBoard();
  }

  generateGameBoard(
    j = 0,
    arr = [
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
      { arr1: [], isPlaced: false },
    ]
  ) {
    if (j >= 9) {
      return arr;
    }
    for (let i = 0; i <= 8; i++) {
      arr[j].arr1.push([j, i]);
    }
    return this.generateGameBoard(++j, arr);
  }

  placeShip(x, y) {
		//find the object value that has x,y , then set its isplaced value to true
	}
}

export default GameBoard;
