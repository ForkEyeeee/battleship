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
        const adjacentcell = items.find(
          (item) =>
            JSON.stringify(item.coordinate) ===
            JSON.stringify([
              startCell.coordinate[0] + i,
              startCell.coordinate[1],
            ])
        );

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

  function placeRandomShips(enemyBoard) {
    const ships = [
      { name: 'Carrier', length: 5 },
      { name: 'Battleship', length: 4 },
      { name: 'Destroyer', length: 3 },
      { name: 'Submarine', length: 3 },
      { name: 'Frigate', length: 2 },
    ];
    for (let i = 4; i >= 0; i--) {
      let shipPlaced = false;
      while (!shipPlaced) {
        const randomCoordinate =
          enemyBoard[generateRandomCoordinate()].coordinate;
        const randomAxis =
          generateRandomCoordinate() % 2 === 0 ? 'vertical' : 'horizontal';

        console.log(
          `Trying to place: ${ships[i].name} with length: ${ships[i].length}`
        ); // logging the ship name and length
        console.log(
          `Generated coordinate and axis: ${randomCoordinate}, ${randomAxis}`
        ); // logging the generated coordinate and axis

        const result = placeShip(
          randomCoordinate,
          randomAxis,
          ships[i].length,
          enemyBoard
        );

        console.log(`Result of placeShip: ${result}`); // logging the result of placeShip function

        // If placeShip returns an object (indicating success), break out of the loop
        if (typeof result === 'object') {
          console.log(`Successfully placed: ${ships[i].name}`); // logging if the ship was successfully placed
          shipPlaced = true;
        }
        // If placeShip returns a string (indicating an error), the loop will continue, generating new coordinates and trying again
      }
    }
  }

  function isAllShipsSunk(board, enemyBoard, playerBoard) {
    const enemyShips = enemyBoard.filter((item) => item.ship !== undefined);
    const playerShips = playerBoard.filter((item) => item.ship !== undefined);
    if (enemyShips.every((ship) => ship.ship.sink === true)) {
      board.currentPlayer = board.player.name;
      return true;
    }
    if (playerShips.every((ship) => ship.ship.sink === true)) {
      board.currentPlayer = board.enemy.name;
      return true;
    }
    return false;
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
    placeRandomShips,
    receiveAttack,
    receiveAttackFromCPU,
    isAllShipsSunk,
  };
}

export default GameBoard;
