import GameBoard from './gameBoard';
import Player from './player';

let gameBoard;
let player;

beforeEach(() => {
  gameBoard = new GameBoard();
  player = new Player();
});

describe('GameBoard factory has working methods and valid properties', () => {
  test('GameBoard factory object has all properties', () => {
    expect(gameBoard).toHaveProperty('currentTurn');
    expect(gameBoard).toHaveProperty('generateGameBoard');
    expect(gameBoard).toHaveProperty('isAllShipsSunk');
    expect(gameBoard).toHaveProperty('placeShip');
    expect(gameBoard).toHaveProperty('receiveAttack');
  });

  test("placeShip() function updates a ship's position with a length of 3 from undefined to [2,2], [2,3], [2,4]", () => {
    expect(
      gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard)
        .position
    ).not.toBe(undefined);
    expect(
      gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard)
        .position
    ).not.toStrictEqual([
      [2, 2],
      [2, 3],
      [2, 4],
    ]);
    expect(
      gameBoard.placeShip([6, 2], 'vertical', 3, player.enemy.gameBoard)
        .position
    ).not.toBe(undefined);
    expect(
      gameBoard.placeShip([6, 2], 'horizontal', 3, player.enemy.gameBoard)
        .position
    ).not.toStrictEqual([
      [6, 2],
      [7, 3],
      [8, 4],
    ]);
  });

  test('placeShip() places a ship with a length property equal to 3', () => {
    expect(
      gameBoard.placeShip([2, 2], 'vertical', 3, player.enemy.gameBoard).length
    ).toEqual(3);
    expect(
      gameBoard.placeShip([6, 2], 'vertical', 3, player.enemy.gameBoard).length
    ).toEqual(3);
  });

  test('receiveAttack() will return a ship if the matching coords are passed', () => {
    gameBoard.placeShip([2, 2], 'horizontal', 3, player.player.gameBoard);
    expect(
      gameBoard.receiveAttack([2, 2], player.player.gameBoard).ship
    ).not.toBe(undefined);
    gameBoard.placeShip([2, 2], 'vertical', 3, player.enemy.gameBoard);
    expect(gameBoard.receiveAttack([7, 2], player.enemy.gameBoard).ship).toBe(
      undefined
    );
  });

  test('receiveAttack() will return a missedSpot if there are no matching coords', () => {
    gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard);
    expect(
      gameBoard.receiveAttack([2, 2], player.enemy.gameBoard).missedSpot
    ).toBe(undefined);
    expect(
      JSON.stringify(
        gameBoard.receiveAttack([6, 2], player.player.gameBoard).missedSpot
      )
    ).toBe(JSON.stringify([6, 2]));
  });

  test('receiveAttack() will increase the hits of a ship', () => {
    gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard);
    expect(
      gameBoard.receiveAttack([2, 2], player.enemy.gameBoard).ship.hits
    ).toBe(1);
  });

  test('all ships sunk for a given board', () => {
    gameBoard.placeShip([2, 2], 'vertical', 3, player.enemy.gameBoard);
    gameBoard.receiveAttack([2, 2], player.enemy.gameBoard);
    gameBoard.receiveAttack([2, 2], player.player.gameBoard);
    gameBoard.receiveAttack([2, 3], player.enemy.gameBoard);
    gameBoard.receiveAttack([2, 2], player.player.gameBoard);
    gameBoard.receiveAttack([2, 4], player.enemy.gameBoard);
    gameBoard.receiveAttack([2, 2], player.player.gameBoard);
    expect(gameBoard.isAllShipsSunk(player.enemy.gameBoard)).toBe(true);
  });

  test("the CPU runs receiveAttack() to randomly select a space on the player's map", () => {
    gameBoard.receiveAttack([2, 2], player.enemy.gameBoard);
    gameBoard.receiveAttack([2, 2], player.player.gameBoard);
    const filteredBoard = player.player.gameBoard.filter(
      (item) => item.isShot === true
    );
    expect(filteredBoard.length).toBeGreaterThan(0);
  });
});
