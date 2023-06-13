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

  test('placeShip() function changes the isPlaced property of selected coord from false to true', () => {
    // const test = new GameBoard();
    // const obj = arr.find((item) => item.coordinate === [2, 4]);
    expect(objOne.placeShip([0,0])).toBe([0,0]);
  });
});
