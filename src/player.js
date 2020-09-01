

export default function Player (name) {
  this.name = name;
  this.score = 0;
  this.turnScore = 0;
}
Player.prototype.resetPlayer = function () {
  this.score = 0;
  this.turnScore = 0;
};
Player.prototype.submitTurnScore = function () {
  this.score += this.turnScore;
};
Player.prototype.totalScore = function () {
  return this.score + this.turnScore;
};
