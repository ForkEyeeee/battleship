import { experiments } from 'webpack';
import GameBoard from './gameBoard';
import Ship from './ship';

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

  test('placeShip() function updates position from undefined to [2,2]', () => {
    expect(objOne.placeShip([2, 2], 'horizontal', 3).position).not.toBe(
      undefined
    );
  });

  test('placeShip() places a ship with a length property equal to its length parameter', () => {
    const objTwo = new GameBoard();
    expect(objTwo.placeShip([2, 2], 'vertical', 3).length).toEqual(3);
  });

  test('receiveAttack() will return a ship if the matching coords are passed ', () => {
    const objFive = new GameBoard();
    objFive.placeShip([2, 2], 'horizontal', 3).length;
    expect(objFive.receiveAttack([2, 2]).ship).not.toBe(undefined);
  });

  test('receiveAttack() will return a missedCoord if theres no matching coords', () => {
    const test = new GameBoard();
    test.placeShip([4, 4], 'horizontal', 3);
    expect(test.receiveAttack([2, 2]).missedSpot).not.toBe(undefined);
    expect(test.receiveAttack([2, 4]).missedSpot).toStrictEqual([2, 4]);
  });

  test('receiveAttack() will increase the hits of a ship', () => {
    const newShip = new Ship(3);
    newShip.hit();
    const objThree = new GameBoard();
    objThree.placeShip([2, 2], 'horizontal', 3).length;
    expect(objThree.receiveAttack([2, 2]).ship.hits).toBe(1);
  });

  test('all ships sunk', () => {
    const objFive = GameBoard();
    objFive.placeShip([2, 2], 'vertical', 3);
    objFive.receiveAttack([2, 2]);
    objFive.receiveAttack([2, 3]);
    objFive.receiveAttack([2, 4]);

    expect(objFive.isAllShipsSunk()).toBe(true);
  });
});
