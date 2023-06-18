import Player from './player';
import Ship from './ship';

const getRandomSpace = (event, newBoard) => {
  const gameBoard = newBoard;
  const getClickedCell = event.target.dataset.id;
  const str = getClickedCell;
  const arr = str.split(',').map(Number);

  const cellFromDataId = gameBoard.enemy.gameBoard.find(
    (item) => JSON.stringify(item.coordinate) === JSON.stringify(arr)
  );

  if (cellFromDataId.isShot === true) {
    alert('This spot on the enemy board has already been hit by you!.');
  } else {
    event.target.style.backgroundColor = 'red';

    gameBoard.gameBoard.receiveAttack(
      arr,
      gameBoard.enemy.gameBoard,
      gameBoard
    );

    const { coordinate } =
      gameBoard.gameBoard.receiveAttackFromCPU(gameBoard).randomSpace;

    const coordinateString = Array.isArray(coordinate)
      ? coordinate.join(',')
      : coordinate;

    const element = document.querySelector(`[data-id="${coordinateString}"]`);
    element.style.backgroundColor = 'blue';

    console.log(newBoard);
  }
};

const getCoordinates = (shipLength) => {
  let coordinates = prompt(
    `Enter the starting coordinate (x, y) for your ship of length ${shipLength}:`
  );
  coordinates = coordinates.split(',').map(Number);

  while (coordinates.length !== 2 || coordinates.some(isNaN)) {
    alert("Invalid coordinates. Please enter a coordinate pair, e.g., '4, 5'.");
    coordinates = prompt(
      `Enter the starting coordinate (x, y) for your ship of length ${shipLength}:`
    );
    coordinates = coordinates.split(',').map(Number);
  }

  return coordinates;
};

const getDirection = () => {
  let direction = prompt("Enter ship direction ('horizontal' or 'vertical'):");
  direction = direction.toLowerCase();

  while (direction !== 'horizontal' && direction !== 'vertical') {
    alert("Invalid direction. Please enter either 'horizontal' or 'vertical'.");
    direction = prompt("Enter ship direction ('horizontal' or 'vertical'):");
    direction = direction.toLowerCase();
  }
  return direction;
};

// Using the function
// const coordinates = getCoordinates();
// console.log(coordinates);

const generatePlayerShips = () => {};
const buildGameBoard = (player = 'jeff') => {
  const newBoard = new Player(player);

  const getMainContainer = document.getElementById('main-container'); // create player board
  const getEnemyContainer = document.getElementById('enemy-container');

  const playerBoard = newBoard.player.gameBoard;
  getMainContainer.style.gridTemplateRows = `repeat(${
    playerBoard.length / 10
  }, 50px)`;
  getMainContainer.style.gridTemplateColumns = `repeat(${
    playerBoard.length / 10
  }, 50px)`;
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grids = document.createElement('div');
      grids.setAttribute('class', 'grid-item');
      grids.dataset.id = [
        playerBoard[y * 10 + x].coordinate[1],
        playerBoard[y * 10 + x].coordinate[0],
      ];

      getMainContainer.appendChild(grids);
    }
  }
  const enemyBoard = newBoard.enemy.gameBoard;
  getEnemyContainer.style.gridTemplateRows = `repeat(${
    enemyBoard.length / 10
  }, 50px)`;
  getEnemyContainer.style.gridTemplateColumns = `repeat(${
    enemyBoard.length / 10
  }, 50px)`;
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grids = document.createElement('div');
      grids.setAttribute('class', 'grid-item');
      grids.dataset.id = [
        enemyBoard[y * 10 + x].coordinate[1],
        enemyBoard[y * 10 + x].coordinate[0],
      ];
      grids.addEventListener('click', (event) =>
        getRandomSpace(event, newBoard)
      );
      getEnemyContainer.appendChild(grids);
    }
  }
  const carrierShip = new Ship(5);
  const battleShip = new Ship(4);
  const destroyerShip = new Ship(3);
  const submarineShip = new Ship(3);
  const frigateShip = new Ship(2);
  const getCarrierCoords = 0;
  setTimeout(() => {
    newBoard.gameBoard.placeShip(
      [3, 3],
      'vertical',
      5,
      newBoard.player.gameBoard
    );

    newBoard.gameBoard.placeShip(
      [3, 1],
      'vertical',
      4,
      newBoard.player.gameBoard
    );

    newBoard.gameBoard.placeShip(
      [6, 6],
      'vertical',
      3,
      newBoard.player.gameBoard
    );

    newBoard.gameBoard.placeShip(
      [8, 4],
      'vertical',
      3,
      newBoard.player.gameBoard
    );

    newBoard.gameBoard.placeShip(
      [9, 7],
      'vertical',
      2,
      newBoard.player.gameBoard
    );

    const items = newBoard.player.gameBoard.filter(
      (item) => item.isPlaced === true
    );

    items.forEach((item) => {
      // Convert the coordinates to a string format that matches the data-id attribute
      const coordString = item.coordinate.join(',');

      // Get the grid cell with this data-id
      const cellElement = document.querySelector(`[data-id="${coordString}"]`);

      // Now you can manipulate the cell element
      if (cellElement) {
        cellElement.style.backgroundColor = 'gray';
      }
    });
  }, 0);

  console.log(newBoard);
};
export { generatePlayerShips, buildGameBoard };
