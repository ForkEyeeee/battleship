import Ship from './ship';

class GameBoard {
  constructor() {
    this.gameBoard = this.generateGameBoard();
  }

  generateGameBoard() {
    const arr = [];
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        arr.push({ coordinate: [i, j], isPlaced: false, isShot: false });
      }
    }
    return arr;
  }

  placeShip(arr, axis, length) {
    if (arr[0] > 10 || arr[1] > 10) {
      return 'out of bounds';
    }
    const ship = new Ship(length);
    const items = this.gameBoard;
    const test = items.filter(
      (item) => JSON.stringify(item.coordinate) === JSON.stringify(arr)
    );
    const newTest = [];
    newTest.push(test[0]);
    if (axis === 'vertical') {
      for (let i = 1; i < length; i++) {
        const test2 = items.filter(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([test[0].coordinate[0], test[0].coordinate[1] + i])
        );

        if (newTest[newTest.length - 1].isPlaced === true) {
          return 'ship is here already';
        }
        newTest.push(test2[0]);
      }
    } else if (axis === 'horizontal') {
      for (let i = 1; i < length; i++) {
        const test2 = items.filter(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([test[0].coordinate[1] + i, test[0].coordinate[0]])
        );

        if (newTest[newTest.length - 1].isPlaced === true) {
          return 'ship is here already';
        }
        newTest.push(test2[0]);
      }
    }
    newTest.forEach((element) => {
      element.isPlaced = true;
    });
    console.log(newTest);
    ship.position = newTest;
    return ship;
  }

  receiveAttack(arr, ship) {
    // find a way to get all of the ships on the board and their coords, and if arr matches any of them, do a missedShot. otherwise, do ship.hit()
    const items = this.gameBoard;
    const test = items.filter(
      (item) => JSON.stringify(item.coordinate) === JSON.stringify(arr)
    );
    if (test !== undefined) {
      ship.hit();
    }
    return {
      ship,
      missedSpot: arr,
    };
  }
}

export default GameBoard;
