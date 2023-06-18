import GameBoard from './gameBoard';

function Player(playerName) {
  const test = new GameBoard();
  return {
    player: {
      gameBoard: test.generateGameBoard(),
      name: playerName,
    },
    enemy: {
      gameBoard: test.generateGameBoard(),
      name: 'CPU',
    },
    gameBoard: test,

		currentPlayer: playerName
  };
}

export default Player;
