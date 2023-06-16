import GameBoard from './gameBoard';

let objOne = new GameBoard();
beforeEach(() => {
  objOne = new GameBoard();
});

describe('gameBoard factory has working methods and valid properties', () => {
  test('GameBoard factory object has all properties', () => {
    expect(objOne).toHaveProperty('currentTurn');
    expect(objOne).toHaveProperty('enemyGameBoard');
    expect(objOne).toHaveProperty('generateGameBoard');
    expect(objOne).toHaveProperty('isAllShipsSunk');
    expect(objOne).toHaveProperty('placeShip');
    expect(objOne).toHaveProperty('playerGameBoard');
    expect(objOne).toHaveProperty('receiveAttack');
  });

  test('gameBoard factory has a full length array of 121 for both player and enemy', () => {
    expect(objOne.playerGameBoard.gameBoard.length).toBe(121);
    expect(objOne.enemyGameBoard.gameBoard.length).toBe(121);
  });

  test('placeShip() function updates a ships position with a length of 3 from undefined to [2,2], [2,3], [2,4]', () => {
    expect(
      objOne.placeShip([2, 2], 'horizontal', 3, objOne.playerGameBoard).position
    ).not.toBe(undefined);
    expect(
      objOne.placeShip([2, 2], 'horizontal', 3, objOne.playerGameBoard).position
    ).not.toBe([2, 2], [2, 3], [2, 4]);
    expect(
      objOne.placeShip([6, 2], 'horizontal', 3, objOne.enemyGameBoard).position
    ).not.toBe(undefined);
    expect(
      objOne.placeShip([6, 2], 'horizontal', 3, objOne.enemyGameBoard).position
    ).not.toBe([6, 2], [7, 3], [8, 4]);
  });

  test('placeShip() places a ship with a length property equal to 3', () => {
    expect(
      objOne.placeShip([2, 2], 'vertical', 3, objOne.playerGameBoard).length
    ).toEqual(3);
    expect(
      objOne.placeShip([6, 2], 'vertical', 3, objOne.enemyGameBoard).length
    ).toEqual(3);
  });

  test('receiveAttack() will return a ship if the matching coords are passed ', () => {
    objOne.placeShip([2, 2], 'horizontal', 3, objOne.playerGameBoard);
    expect(objOne.receiveAttack([2, 2], objOne.playerGameBoard).ship).not.toBe(
      undefined
    );
    objOne.placeShip([6, 2], 'horizontal', 3, objOne.enemyGameBoard);
    expect(objOne.receiveAttack([2, 2], objOne.enemyGameBoard).ship).toBe(
      undefined
    );
  });

  test('receiveAttack() will return a missedCoord if theres no matching coords', () => {
    objOne.placeShip([2, 2], 'horizontal', 3, objOne.playerGameBoard);
    expect(
      objOne.receiveAttack([2, 2], objOne.playerGameBoard).missedSpot
    ).toBe(undefined);
    expect(
      JSON.stringify(
        objOne.receiveAttack([6, 2], objOne.playerGameBoard).missedSpot
      )
    ).toBe(JSON.stringify([6, 2]));
  });

  test('receiveAttack() will increase the hits of a ship', () => {
    objOne.placeShip([2, 2], 'horizontal', 3, objOne.enemyGameBoard);
    objOne.receiveAttack([2, 2], objOne.enemyGameBoard);
    expect(objOne.receiveAttack([2, 2], objOne.enemyGameBoard).ship.hits).toBe(
      2
    );
  });

  test('all ships sunk', () => {
    objOne.placeShip([2, 2], 'vertical', 3, objOne.enemyGameBoard);
    objOne.receiveAttack([2, 2], objOne.enemyGameBoard);
    objOne.receiveAttack([2, 3], objOne.enemyGameBoard);
    objOne.receiveAttack([2, 4], objOne.enemyGameBoard);
    expect(objOne.isAllShipsSunk(objOne.enemyGameBoard.gameBoard)).toBe(true);
  });
});
