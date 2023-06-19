import Player from './player';
import getValues from './getUserInput';

const newBoard = new Player('jeff');
const form = document.getElementById('form-ship');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const openModel = document.getElementById('myBtn');
const randomBtn = document.getElementById('random-btn');

const getRandomSpace = (event) => {
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

function determinePlacedShips() {
  const placedShips = newBoard.player.gameBoard.filter(
    (item) => item.isPlaced === true
  );
  if (placedShips.length === 0) {
    resetBtn.style.visibility = 'hidden';
    openModel.style.visibility = 'block';
  } else {
    resetBtn.style.visibility = 'block';
    openModel.style.visibility = 'hidden';
  }
}
// make the reset button fix these visibilities back, and then run the buildgameboard again
const buildGameBoard = () => {
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
};

const placeChosenShips = () => {
  const getValuesFromInput = getValues();
  newBoard.gameBoard.placeShip(
    getValuesFromInput.convertedArray[0],
    getValuesFromInput.carrierPosition,
    5,
    newBoard.player.gameBoard
  );

  newBoard.gameBoard.placeShip(
    getValuesFromInput.convertedArray[1],
    getValuesFromInput.battleShipPosition,
    4,
    newBoard.player.gameBoard
  );

  newBoard.gameBoard.placeShip(
    getValuesFromInput.convertedArray[2],
    getValuesFromInput.destroyerPosition,
    3,
    newBoard.player.gameBoard
  );

  newBoard.gameBoard.placeShip(
    getValuesFromInput.convertedArray[3],
    getValuesFromInput.submarinePosition,
    3,
    newBoard.player.gameBoard
  );

  newBoard.gameBoard.placeShip(
    getValuesFromInput.convertedArray[4],
    getValuesFromInput.frigatePosition,
    2,
    newBoard.player.gameBoard
  );

  const items = newBoard.player.gameBoard.filter(
    (item) => item.isPlaced === true
  );

  items.forEach((item) => {
    const coordString = item.coordinate.join(',');
    const cellElement = document.querySelector(`[data-id="${coordString}"]`);
    if (cellElement) {
      cellElement.style.backgroundColor = 'gray';
    }
  });
  console.log(newBoard);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  placeChosenShips();
  form.reset();
  determinePlacedShips();
});

export { buildGameBoard, determinePlacedShips };
