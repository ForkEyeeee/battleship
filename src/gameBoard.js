import Ship from './ship';

function GameBoard() {
  function generateRandomCoordinate() {
    const randomNumber = Math.floor(Math.random() * 121);
    return randomNumber;
  }

  function generateGameBoard() {
    const board = [];
    for (let i = 0; i <= 10; i += 1) {
      for (let j = 0; j <= 10; j += 1) {
        board.push({
          coordinate: [i, j],
          isPlaced: false,
          isShot: false,
          ship: undefined,
        });
      }
    }
    return board;
  }

  let currentTurn = 'Player';

  function placeShip(startCoordinate, axis, length, board) {
    if (startCoordinate[0] + length > 10 || startCoordinate[1] + length > 10) {
      return 'out of bounds';
    }
    const ship = Ship(length);
    const items = board;
    const startCell = items.filter(
      (item) =>
        JSON.stringify(item.coordinate) === JSON.stringify(startCoordinate)
    )[0];

    const cellsToPlace = [startCell];

    if (axis === 'vertical') {
      for (let i = 1; i < length; i++) {
        const cell = items.filter(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([
              startCell.coordinate[0],
              startCell.coordinate[1] + i,
            ])
        )[0];

        if (cell.isPlaced === true) {
          return 'ship is here already';
        }
        cellsToPlace.push(cell);
      }
    } else if (axis === 'horizontal') {
      for (let i = 1; i < length; i++) {
        const cell = items.filter(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([
              startCell.coordinate[1] + i,
              startCell.coordinate[0],
            ])
        )[0];

        if (cell.isPlaced === true) {
          return 'ship is here already';
        }
        cellsToPlace.push(cell);
      }
    }

    ship.position = cellsToPlace.map((cell) => cell.coordinate);
    cellsToPlace.forEach((cell) => {
      cell.isPlaced = true;
      cell.ship = ship;
    });
    return ship;
  }

  function receiveAttack(coordinate, board, playerBoard) {
    function receiveAttackCPU() {
      if (currentTurn === 'CPU') {
        const items = board;
        let randomCoordinate = generateRandomCoordinate();
        while (items[randomCoordinate].isShot === true) {
          randomCoordinate = generateRandomCoordinate();
        }
        const enemyGameBoard = playerBoard;

        enemyGameBoard[randomCoordinate].isShot = true;

        if (enemyGameBoard[randomCoordinate].ship !== undefined) {
          enemyGameBoard[randomCoordinate].ship.hit();
        }

        if (enemyGameBoard[randomCoordinate].isPlaced === true) {
          return {
            ship: enemyGameBoard[randomCoordinate].ship,
          };
        }

        currentTurn = currentTurn === 'Player' ? 'CPU' : 'Player';
      }
      return {
        currentTurn,
        missedSpot: coordinate,
      };
    }
    const items = board;

    const targetCell = items.find(
      (item) => JSON.stringify(item.coordinate) === JSON.stringify(coordinate)
    );

    if (targetCell.ship !== undefined) {
      targetCell.ship.hit();
      receiveAttackCPU(playerBoard);
    } else if (targetCell.isShot === false) {
      targetCell.isShot = true;
      receiveAttackCPU(playerBoard);
    } else {
      return 'this spot is already hit';
    }

    currentTurn = currentTurn === 'Player' ? 'CPU' : 'Player';

    return {
      ship: targetCell.ship,
      currentTurn,
      missedSpot: coordinate,
    };
  }

  function isAllShipsSunk(board) {
    const ships = board.filter((item) => item.ship !== undefined);
    return ships.every((ship) => ship.ship.sink === true);
  }

  return {
    currentTurn,
    generateGameBoard,
    placeShip,
    receiveAttack,
    isAllShipsSunk,
  };
}

export default GameBoard;
