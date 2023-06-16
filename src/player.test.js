import Player from './player';

const newPlayers = new Player('jeff', 'matt')

describe('player factory has working methods and valid properties', () => {
  test('player factory has all properties and methods', () => {
    expect(newPlayers).toHaveProperty('player');
    expect(newPlayers).toHaveProperty('enemy');
    expect(newPlayers).toHaveProperty('GameBoard');
  });
});
