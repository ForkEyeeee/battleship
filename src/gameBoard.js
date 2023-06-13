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

  placeShip(arr) {
    // this.gameBoard.forEach((element) => {
    //   if (element.isPlaced === false) {
    //     return element;
    //   }
    //   return 2;
    // });
    // const searchIndex = this.gameBoard.map((e) => e.coordinate).indexOf([0,0]);
    // const obj = test[searchIndex].coordinate;
    // obj.isPlaced = true;
    // return searchIndex;
    // for (const  of this.gameBoard) {
    //   if (value.coordinate === [4, 3]) {
    //     return value.coordinate;
    //   }
    // }
    const items = this.gameBoard;
    const test = items.filter((item) => item.coordinate === arr);
		test.isPlaced = true
    return test;
  }
}

export default GameBoard;
