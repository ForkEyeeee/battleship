import GameBoard from './gameBoard';
import Ship from './ship';

const objOne = new GameBoard();

// console.log((objOne.placeShip([2, 2], 'vertical', 3).length))
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

  test('receiveAttack() will return a ship and a missed coordinate', () => {
    const newShip = new Ship([2, 4]);
    expect(objOne.receiveAttack([2, 4], newShip).ship).not.toBe(undefined);
    expect(objOne.receiveAttack([2, 4], newShip).missedSpot).not.toBe(
      undefined
    );
  });

  test('receiveAttack() will increase the hits of a ship', () => {
    const newShip = new Ship(3, [2, 4]);
    const oldHits = newShip.hits;
    expect(objOne.receiveAttack([2, 4], newShip).ship.hits).toBe(oldHits + 1);
  });
});
