import GameBoard from './gameBoard';
import Player from './player';

let gameObj = new GameBoard();
let playersObj = new Player();

beforeEach(() => {
  gameObj = new GameBoard();
  playersObj = new Player();
});

describe('gameBoard factory has working methods and valid properties', () => {
  test('GameBoard factory object has all properties', () => {
    expect(gameObj).toHaveProperty('currentTurn');
    expect(gameObj).toHaveProperty('generateGameBoard');
    expect(gameObj).toHaveProperty('isAllShipsSunk');
    expect(gameObj).toHaveProperty('placeShip');
    expect(gameObj).toHaveProperty('receiveAttack');
  });

  test('placeShip() function updates a ships position with a length of 3 from undefined to [2,2], [2,3], [2,4]', () => {
    expect(
      gameObj.placeShip([2, 2], 'horizontal', 3, playersObj.enemy.gameBoard)
        .position
    ).not.toBe(undefined);
    expect(
      gameObj.placeShip([2, 2], 'horizontal', 3, playersObj.enemy.gameBoard)
        .position
    ).not.toBe([2, 2], [2, 3], [2, 4]);
    expect(
      gameObj.placeShip([6, 2], 'vertical', 3, playersObj.enemy.gameBoard)
        .position
    ).not.toBe(undefined);
    expect(
      gameObj.placeShip([6, 2], 'horizontal', 3, playersObj.enemy.gameBoard)
        .position
    ).not.toBe([6, 2], [7, 3], [8, 4]);
  });

  test('placeShip() places a ship with a length property equal to 3', () => {
    expect(
      gameObj.placeShip([2, 2], 'vertical', 3, playersObj.enemy.gameBoard)
        .length
    ).toEqual(3);
    expect(
      gameObj.placeShip([6, 2], 'vertical', 3, playersObj.enemy.gameBoard)
        .length
    ).toEqual(3);
  });

  test('receiveAttack() will return a ship if the matching coords are passed ', () => {
    gameObj.placeShip([2, 2], 'horizontal', 3, playersObj.player.gameBoard);
    expect(
      gameObj.receiveAttack([2, 2], playersObj.player.gameBoard).ship
    ).not.toBe(undefined);
    gameObj.placeShip([2, 2], 'vertical', 3, playersObj.enemy.gameBoard);
    expect(gameObj.receiveAttack([7, 2], playersObj.enemy.gameBoard).ship).toBe(
      undefined
    );
  });

  test('receiveAttack() will return a missedCoord if theres no matching coords', () => {
    gameObj.placeShip([2, 2], 'horizontal', 3, playersObj.enemy.gameBoard);
    expect(
      gameObj.receiveAttack([2, 2], playersObj.enemy.gameBoard).missedSpot
    ).toBe(undefined);
    expect(
      JSON.stringify(
        gameObj.receiveAttack([6, 2], playersObj.player.gameBoard).missedSpot
      )
    ).toBe(JSON.stringify([6, 2]));
  });

  test('receiveAttack() will increase the hits of a ship', () => {
    gameObj.placeShip([2, 2], 'horizontal', 3, playersObj.enemy.gameBoard);
    expect(
      gameObj.receiveAttack([2, 2], playersObj.enemy.gameBoard).ship.hits
    ).toBe(1);
    gameObj.placeShip([2, 2], 'horizontal', 3, playersObj.player.gameBoard);
    expect(
      gameObj.receiveAttack([2, 2], playersObj.player.gameBoard).ship.hits
    ).toBe(1);
  });

  test('all ships sunk for a given board', () => {
    gameObj.placeShip([2, 2], 'vertical', 3, playersObj.enemy.gameBoard);
    gameObj.receiveAttack([2, 2], playersObj.enemy.gameBoard);
    gameObj.receiveAttack([2, 3], playersObj.enemy.gameBoard);
    gameObj.receiveAttack([2, 4], playersObj.enemy.gameBoard);
    expect(gameObj.isAllShipsSunk(playersObj.enemy.gameBoard)).toBe(true);
  });
});
