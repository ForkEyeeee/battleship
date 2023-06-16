import GameBoard from './gameBoard';

function Player() {
  const test = new GameBoard();
  return {
    player: {
      gameBoard: test.playerGameBoard,
    },
    enemy: {
      gameBoard: test.enemyGameBoard,
    },
    GameBoard: test,
  };
}

export default Player;
