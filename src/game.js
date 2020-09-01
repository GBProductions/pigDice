export default function Game () {
  this.players = []; //[tom, bob]
  this.currentPlayerIndex = 0;//   0     1
  this.playerCount = 0;
  this.gameVariation = "oneDice";
}
Game.prototype.addPlayer = function (player) {
  this.players.push(player);
  this.playerCount++;
};
Game.prototype.nextPlayer = function () {
  this.players[this.currentPlayerIndex].turnScore = 0;
  if(this.currentPlayerIndex + 1 < this.playerCount) {
    this.currentPlayerIndex++;
  } else {
    this.currentPlayerIndex = 0;
  }
};
Game.prototype.resetPlayers = function () {
  this.players.forEach(element => {
    element.resetPlayer();
  });
};
Game.prototype.resetGame = function () {
  this.currentPlayerIndex = 0;
  this.resetPlayers();
};
Game.prototype.rollDice = function() {
  return Math.floor(Math.random() * 6) + 1; 
};
Game.prototype.turn = function ( DICE) {
  
  if(DICE === 1) {
    return false;
  } else {
    this.players[this.currentPlayerIndex].turnScore += DICE;
    return true;
  }
};

Game.prototype.twoDiceTurn = function (dice1, dice2) {
  let diceTotal = dice1 + dice2;
  if (((dice1 != 1) && (dice2 != 1)) && (dice1 != dice2) ){
    //GAME.addDiceToTurn(diceTotal)
    this.players[this.currentPlayerIndex].turnScore += diceTotal;
    return false;
  } else if ((dice1 === 1 && dice2 != 1) || (dice1 != 1 && dice2 === 1)) {
    this.nextPlayer();
    return true;
  } else if (dice1 + dice2 === 2) {
    //GAME.resetCurrentPlayerSCore()
    this.players[this.currentPlayerIndex].score = 0;
    this.nextPlayer();
    return true;
  } else if ((dice1 === dice2) &&  (dice1 + dice2 > 2)) {
    //GAME.addDiceToTurn(diceTotal)
    this.players[this.currentPlayerIndex].turnScore += diceTotal;
    return true;
  }
};

Game.prototype.sortPlayersByScore = function () {
  this.players.sort(function (a,b) {
    return a.score - b.score;
  });
};