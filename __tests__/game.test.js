// import Triangle from './../src/js/triangle.js';
import Game from '../src/game.js';
import Player from '../src/player.js';

// describe('Triangle', () => {
describe ('Game', () => {

  test('playerCount should increase by one and players array needs to grow by 1 index', () => {
    let game = new Game();
    let playerCount = game.playerCount;
    let player = new Player("bob");
    let length = game.players.length;
    game.addPlayer(player);
    expect(game.playerCount).toEqual(playerCount + 1);
    expect(game.players.length).toEqual(length + 1);
  });

  test('currentPlayerIndex should increase by one in the players array per player turn.', () => {
    let game = new Game();
    game.addPlayer(new Player('bob'));
    
    game.playerCount = 10;
    let index = game.currentPlayerIndex;
    
    game.nextPlayer();
    expect (index + 1).toEqual(game.currentPlayerIndex);
    //expect (arrayi = arrayi + 1)
  });
  
  test('When currentPlayerIndex reaches end of array, currentPlayerIndex returns to 0', () => {
    let game = new Game();
    game.addPlayer(new Player('bob'));
    game.addPlayer(new Player('bob1'));
    game.currentPlayerIndex = 1;
    game.nextPlayer();
    expect(0).toEqual(game.currentPlayerIndex);
  });
});



//   test('should correctly create a triangle object with three lengths', () => {
//     const triangle = new Triangle(2,4,5);
//     expect(triangle.side1).toEqual(2);
//     expect(triangle.side2).toEqual(4);
//     expect(triangle.side3).toEqual(5);
//   });

//   test('should correctly determine whether three lengths are not a triangle', () => {
//     const notTriangle = new Triangle(3,9,22);
//     expect(notTriangle.checkType()).toEqual("not a triangle");
//   });

//   test('should correctly determine whether three lengths make an isosceles triangle', () => {
//     const isocTriangle = new Triangle(5,5,7)
//     expect(isocTriangle.checkType()).toEqual("isosceles triangle");
//   });

//   test('should correctly determine whether three lengths make an scalene triangle', () => {
//     const scalTriangle = new Triangle(2,3,4)
//     expect(scalTriangle.checkType()).toEqual("scalene triangle");
//   });

//   test('should correctly determine whether three lengths make an equilateral triangle', () => {
//     const equiTriangle = new Triangle(5,5,5)
//     expect(equiTriangle.checkType()).toEqual("equilateral triangle");
//   });

// });