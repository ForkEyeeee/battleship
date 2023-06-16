import Ship from './ship';

const oneObj = new Ship(3);

describe('ship factory has working methods and valid properties', () => {
  test('ship class has length, hits, and sink properties', () => {
    expect(oneObj).toHaveProperty('length');
    expect(oneObj).toHaveProperty('hits');
    expect(oneObj).toHaveProperty('sink');
  });

  test('ship factory hit() function adds 1 to current hits', () => {
    const oldHits = oneObj.hits;
    oneObj.hit();
    expect(oneObj.hits).toBe(oldHits + 1);
  });

  test('ship factory isSunk() function updates sink property to false if length > hits', () => {
		oneObj.hits = 2
  	oneObj.isSunk()
    expect(oneObj.sink).toBe(false);
  });

  test('ship factory isSunk() function updates sink property to true if length < hits', () => {
		oneObj.hits = 4
  	oneObj.isSunk()
    expect(oneObj.sink).toBe(true);
  });
});

