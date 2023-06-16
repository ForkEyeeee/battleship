import Player from './player';

let playersObj = new Player();

beforeEach(() => {
  playersObj = new Player();
});

describe('player factory has working methods and valid properties', () => {
  test('player factory has all properties and methods', () => {
    expect(playersObj).toHaveProperty('GameBoard');
    expect(playersObj).toHaveProperty('enemy');
    expect(playersObj).toHaveProperty('player');
  });
});
test('player factory enemy and player has a full length array of 121', () => {
  expect(playersObj.enemy.gameBoard.length).toBe(121);
  expect(playersObj.enemy.gameBoard.length).toBe(121);
});
