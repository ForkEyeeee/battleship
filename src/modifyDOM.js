import Player from './player';

const getRandomSpace = (event, newBoard) => {
  const gameBoard = newBoard;
  const { currentPlayer } = newBoard;
  const getClickedCell = event.target.dataset.id;
  const str = getClickedCell;
  const arr = str.split(',').map(Number);

  const cellFromDataId = gameBoard.enemy.gameBoard.find(
    (item) => JSON.stringify(item.coordinate) === JSON.stringify(arr)
  );

  const remainingSpaces = gameBoard.enemy.gameBoard.filter(
    (item) => !item.isShot
  );
  // const randomIndex = Math.floor(Math.random() * remainingSpaces.length);
  // const randomSpace = remainingSpaces[randomIndex];

  if (cellFromDataId.isShot === true) {
    alert('This spot on the enemy board has already been hit by you!.');
  } else {
    event.target.style.backgroundColor = 'blue';

    gameBoard.gameBoard.receiveAttack(
      arr,
      gameBoard.enemy.gameBoard,
      gameBoard
    );

    // if (getRandomAiHit.objGameBoard.currentPlayer === currentPlayer) {
    //   alert('This spot on the ');
    // }

    const { coordinate } =
      gameBoard.gameBoard.receiveAttackFromCPU(gameBoard).randomSpace;

    const coordinateString = Array.isArray(coordinate)
      ? coordinate.join(',')
      : coordinate;

    const element = document.querySelector(`[data-id="${coordinateString}"]`);
		element.style.backgroundColor = 'red';
    // if (getRandomAiHit.randomSpot.randomSpace.isShot === false) {
    //   element.style.backgroundColor = 'red';
    //   getRandomAiHit.randomSpot.randomSpace.isShot = true;
    //   cellFromDataId.isShot = true; // Mark the cell as shot
    // } else {
    //   console.log(randomSpace);
    //   getRandomSpace(event, newBoard); // Try again
    // }
  }
};

const buildGameBoard = () => {
  const newBoard = new Player('jeff');
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

export default buildGameBoard;
