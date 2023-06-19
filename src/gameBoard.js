import Ship from './ship';

function GameBoard() {
  function generateRandomCoordinate() {
    const randomNumber = Math.floor(Math.random() * 100);
    return randomNumber;
  }

	
  function generateGameBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
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

  // let currentTurn = 'Player';

  function placeShip(startCoordinate, axis, length, board) {
    // pass board to place ship on
    if (
      (startCoordinate[0] + length > 10 && axis === 'horizontal') ||
      (startCoordinate[1] + length > 10 && axis === 'vertical')
    ) {
      return 'out of bounds';
    }
    const ship = Ship(length);
    const items = board;
    const startCell = items.find(
      (item) =>
        JSON.stringify(item.coordinate) === JSON.stringify(startCoordinate)
    );

    const cellsToPlace = [startCell];

    if (axis === 'vertical') {
      for (let i = 1; i < length; i += 1) {
        const adjacentcell = items.find(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([
              startCell.coordinate[0],
              startCell.coordinate[1] + i,
            ])
        );

        if (adjacentcell.isPlaced === true) {
          return 'ship is here already, cannot place ship';
        }

        cellsToPlace.push(adjacentcell);
      }
    } else if (axis === 'horizontal') {
      for (let i = 1; i < length; i += 1) {
        const adjacentcell = items.filter(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([
              startCell.coordinate[1] + i,
              startCell.coordinate[0],
            ])
        )[0];

        if (adjacentcell.isPlaced === true) {
          return 'ship is here already, cannot place ship';
        }

        cellsToPlace.push(adjacentcell);
      }
    }
    cellsToPlace.forEach((cell) => {
      cell.isPlaced = true;
      cell.ship = ship;
    });

    // ship.position = cellsToPlace.map((cell) => cell.coordinate);

    return {
      ship,
      cellsToPlace,
    };
  }

  function isAllShipsSunk(board) {
    const ships = board.filter((item) => item.ship !== undefined);
    return ships.every((ship) => ship.ship.sink === true);
  }

  function receiveAttackFromCPU(gameBoard) {
    // pass the entire gameboard, but only use the player part
    const playerBoard = gameBoard.player.gameBoard;
    let randomCoordinate = generateRandomCoordinate();
    while (playerBoard[randomCoordinate].isShot === true) {
      randomCoordinate = generateRandomCoordinate();
    }

    if (playerBoard[randomCoordinate].ship !== undefined) {
      playerBoard[randomCoordinate].ship.hit();
      playerBoard[randomCoordinate].isShot = true;
    } else {
      playerBoard[randomCoordinate].isShot = true;
    }

    // if (isAllShipsSunk(playerBoard)) {
    //   return `${gameBoard.currentPlayer} wins!`;
    // }

    if (gameBoard.currentPlayer === gameBoard.player.name) {
      gameBoard.currentPlayer = gameBoard.enemy.name;
    } else {
      gameBoard.currentPlayer = gameBoard.player.name;
    }

    return {
      randomSpace: playerBoard[randomCoordinate],
      currentPlayer: gameBoard.currentPlayer,
    };
  }

  function receiveAttack(coordinate, enemyboard, gameBoard) {
    // pass the enemyboard and the entire gameboard
    if (
      coordinate[0] < 0 ||
      coordinate[0] > 10 ||
      coordinate[1] < 0 ||
      coordinate[1] > 10
    ) {
      return 'out of bounds';
    }
    const objGameBoard = gameBoard;
    const enemyCell = enemyboard.find(
      (item) => JSON.stringify(item.coordinate) === JSON.stringify(coordinate)
    );

    if (enemyCell === undefined || enemyCell.isShot) {
      // enemy cell is shot already or not found
      return {
        coordinate,
        currentPlayer: objGameBoard.currentPlayer,
      };
    }

    if (enemyCell.ship !== undefined) {
      enemyCell.ship.hit();
      enemyCell.isShot = true;
    } else {
      enemyCell.isShot = true;
    }

    // if (isAllShipsSunk(enemyboard)) {
    //   return `${gameBoard.currentPlayer} wins!`;
    // }

    if (gameBoard.currentPlayer === objGameBoard.player.name) {
      objGameBoard.currentPlayer = objGameBoard.enemy.name;
    } else {
      objGameBoard.currentPlayer = objGameBoard.player.name;
    }

    return {
      // enemy cell was hit or shot and is found
      enemyCell,
      currentPlayer: objGameBoard.currentPlayer,
    };
  }

  return {
    generateGameBoard,
    placeShip,
    receiveAttack,
    receiveAttackFromCPU,
    isAllShipsSunk,
  };
}

export default GameBoard;
