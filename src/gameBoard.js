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
    const ship = new Ship(length, arr);
    const items = this.gameBoard;
    const test = items.filter(
      (item) =>
        JSON.stringify(item.coordinate) === JSON.stringify(ship.position)
    );
    const newTest = [];
    newTest.push(ship.position);
    if (axis === 'vertical') {
      for (let i = 1; i < length; i++) {
        if (test[0].isPlaced === true) {
          break;
        } else {
          newTest.push([test[0].coordinate[0] + i, test[0].coordinate[1]]);
        }
      }
    } else if (axis === 'horizontal') {
      for (let i = 1; i < length; i++) {
        if (test[0].isPlaced === true) {
          break;
        } else {
          newTest.push([test[0].coordinate[1], test[0].coordinate[0] + i]);
        }
      }
    }
    test[0].isPlaced = true;
    for (let x = 0; x <= newTest.length; x++) {
      const filteredItem = items.filter(
        (item) =>
          Array.isArray(item.coordinate) &&
          item.coordinate.length === 2 &&
          item.coordinate[0] === newTest[x] &&
          item.coordinate[1] === newTest[x + 1]
      );
			console.log(filteredItem)
			//find some way to find newTest items from the gameboard, and set their isShot peorpty to true. maybe do it from the pushes ^
      filteredItem.isShot = true;
    }
    ship.position = newTest;
    return ship;
  }

  receiveAttack(arr, ship) {
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
