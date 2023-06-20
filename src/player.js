import GameBoard from './gameBoard';

function Player(playerName) {
  const gameBoard = new GameBoard();
  return {
    player: {
      gameBoard: gameBoard.generateGameBoard(),
      name: playerName,
    },
    enemy: {
      gameBoard: gameBoard.generateGameBoard(),
      name: 'CPU',
    },
    gameBoard,

    currentPlayer: playerName,
  };
}

export default Player;
