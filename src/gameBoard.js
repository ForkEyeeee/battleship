import Ship from './ship';

function GameBoard() {
  function generateGameBoard() {
    const arr = [];
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        arr.push({
          coordinate: [i, j],
          isPlaced: false,
          isShot: false,
          ship: undefined,
        });
      }
    }
    return arr;
  }

  const gameBoard = generateGameBoard();

  function placeShip(arr, axis, length) {
    if (arr[0] + length > 10 || arr[1] + length > 10) {
      return 'out of bounds';
    }
    const ship = Ship(length);
    const items = gameBoard;
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
    ship.position = newTest.map((item) => item.coordinate);
    newTest.forEach((element) => {
      element.isPlaced = true;
      element.ship = ship;
    });
    console.log(newTest);
    return ship;
  }

  function receiveAttack(arr) {
    const items = gameBoard;
    let test = items.filter((item) => item.ship !== undefined);

    if (test.length !== 0) {
      test = items.filter(
        (item) => JSON.stringify(item.coordinate) === JSON.stringify(arr)
      );
      if (test.length !== 0 && test[0].ship !== undefined) {
        test[0].ship.hit();
      }
      test[0].isShot = true;
    }
    console.log(items);

    if (test[0].ship !== undefined) {
      return {
        ship: test[0].ship,
      };
    }
    return {
      missedSpot: test[0].coordinate,
    };
  }

  function isAllShipsSunk() {
    let isSunk = true;
    const items = gameBoard;
    const test = items.filter((item) => item.ship !== undefined);
    test.forEach((element) => {
      if (element.ship.sink === false) {
        isSunk = false;
      }
    });
    return isSunk;
  }

  return {
    gameBoard,
    placeShip,
    receiveAttack,
    isAllShipsSunk,
  };
}

export default GameBoard;
