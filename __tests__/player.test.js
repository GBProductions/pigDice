import Player from '../src/player.js';

describe('Player', () => {

  let player;

  beforeEach(() => {
    player = new Player('bob');
  });

  test('should correctly reset property values to 0', () => {
    player.score = 5;
    player.turnScore = 4;
    player.resetPlayer();
    expect(player.score).toEqual(0);
    expect(player.turnScore).toEqual(0);
  });

  test('should add turnscore to score', () => {
    player.score = 5;
    player.turnScore = 4;
    player.submitTurnScore();
    expect(player.score).toEqual(9);
  });
  test('should RETURN turnscore + score', () => {
    player.score = 5;
    player.turnScore = 4;
    expect(player.totalScore()).toEqual(9);
  });
});