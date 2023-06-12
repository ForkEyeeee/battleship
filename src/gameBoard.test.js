import GameBoard from './gameBoard';

const objOne = new GameBoard();

describe('gameBoard class has working methods and valid properties', () => {
  test('GameBoard class has gameboard property', () => {
    expect(objOne).toHaveProperty('gameBoard');
  });

  test('GameBoard class has a full length array of 121', () => {
    expect(objOne.gameBoard.length).toBe(121);
  });

  test('first gameBoard coordinate has a coordinate property', () => {
    expect(objOne.gameBoard[0]).toHaveProperty('coordinate');
  });
});
