import Ship from './ship';

let shipObj;

beforeEach(() => {
  shipObj = new Ship(3);
});

describe('ship factory has working methods and valid properties', () => {
  test('ship class has length, hits, and sink properties', () => {
    expect(shipObj).toHaveProperty('length');
    expect(shipObj).toHaveProperty('hits');
    expect(shipObj).toHaveProperty('sink');
  });

  test('ship factory hit() function adds 1 to current hits', () => {
    const oldHits = shipObj.hits;
    shipObj.hit();
    expect(shipObj.hits).toBe(oldHits + 1);
  });

  test('ship factory isSunk() function updates sink property to false if length > hits', () => {
    shipObj.hits = 2;
    shipObj.isSunk();
    expect(shipObj.sink).toBe(false);
  });

  test('ship factory isSunk() function updates sink property to true if length < hits', () => {
    shipObj.hits = 4;
    shipObj.isSunk();
    expect(shipObj.sink).toBe(true);
  });
});
