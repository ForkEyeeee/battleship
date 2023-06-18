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
    expect(gameBoard).toHaveProperty('generateGameBoard');
    expect(gameBoard).toHaveProperty('isAllShipsSunk');
    expect(gameBoard).toHaveProperty('placeShip');
    expect(gameBoard).toHaveProperty('receiveAttack');
  });

  test('placeShip() function returns objects', () => {
    expect(
      gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard).ship
        .position
    ).toBeDefined();
    expect(
      gameBoard.placeShip([7, 7], 'horizontal', 3, player.enemy.gameBoard)
        .cellsToPlace
    ).toBeDefined();
    expect(
      gameBoard.placeShip([6, 2], 'vertical', 3, player.player.gameBoard).ship
        .position
    ).toBeDefined();
    expect(
      gameBoard.placeShip([6, 2], 'horizontal', 3, player.player.gameBoard)
        .cellsToPlace
    ).toBeDefined();
  });

  test('placeShip() returns ship with length property equal to length parameter', () => {
    expect(
      gameBoard.placeShip([2, 2], 'vertical', 3, player.player.gameBoard).ship
        .length
    ).toEqual(3);
    expect(
      gameBoard.placeShip([6, 2], 'horizontal', 3, player.enemy.gameBoard).ship
        .length
    ).toEqual(3);
  });

  test('receiveAttack() will return a ship if the matching coords are passed', () => {
    gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard);
    expect(
      gameBoard.receiveAttack([2, 2], player.enemy.gameBoard, player).enemyCell
    ).toBeDefined();
  });

  test('receiveAttack() will not return a ship if that ship was shot already', () => {
    gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard);
    gameBoard.receiveAttack([4, 7], player.enemy.gameBoard, player);
    expect(
      gameBoard.receiveAttack([4, 7], player.enemy.gameBoard, player).coordinate
    ).toBeDefined();
  });

  test('receiveAttack() will return out of bounds if coordinate is not whtin 0,0 10,10', () => {
    expect(
      gameBoard.receiveAttack([11, 11], player.enemy.gameBoard, player)
    ).toBe('out of bounds');
  });

  test('receiveAttack() will increase the hits of a ship', () => {
    gameBoard.placeShip([2, 2], 'horizontal', 3, player.enemy.gameBoard);
    expect(
      gameBoard.receiveAttack([2, 2], player.enemy.gameBoard, player).enemyCell
        .ship.hits
    ).toBe(1);
  });

  test('receiveAttackFromCPU() will randomly attack a player spot', () => {
    expect(gameBoard.receiveAttackFromCPU(player).randomSpace).toBeDefined();
  });

  test('all ships sunk for a given board', () => {
    gameBoard.placeShip([2, 2], 'vertical', 3, player.player.gameBoard);
    gameBoard.receiveAttack([2, 2], player.enemy.gameBoard, player);
    gameBoard.receiveAttack([2, 3], player.enemy.gameBoard, player);
    gameBoard.receiveAttack([2, 4], player.enemy.gameBoard, player);
    expect(gameBoard.isAllShipsSunk(player.enemy.gameBoard)).toBe(true);
  });

  test("the CPU runs receiveAttack() to randomly select a space on the player's map", () => {
    gameBoard.receiveAttackFromCPU(player);
    const filteredBoard = player.player.gameBoard.filter(
      (item) => item.isShot === true
    );
    expect(filteredBoard.length).toBeGreaterThan(0);
  });
});
