import Player from './player.js';
import Game from './game.js';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';



function updatePlayerListScore (dom, GAME) {
  dom.text('');
  if(GAME.playerCount > 0){
    for(let i = 0; i < GAME.playerCount; i++) {
      if(i === GAME.currentPlayerIndex) {
        dom.append('<li><strong><u><em>' + GAME.players[i].name + ': ' + GAME.players[i].score + '</em></u></strong></li>');
      }else {
        dom.append('<li>' + GAME.players[i].name + ': ' + GAME.players[i].score + '</li>');
      }
    }
  }else {
    dom.text('');
  }
}
function updateDropdown (dom, GAME) {
  dom.text('');
  // for(let i = 0; i < GAME.playerCount; i++) {
  //    dom.append('<option value="' + i + '">' + GAME.players[i].name + '</option>');
  // }
  for(let i = 0; i < GAME.playerCount; i++) {
    dom.append('<option value="' + i + '">' + GAME.players[i].name + '</option>');
  }
}

function displayCurrentPlayerTurn (GAME) {
 
  let i = GAME.currentPlayerIndex;
  if(GAME.playerCount === 0)
  {
    $('#currentPlayer').text('');
    $("#playerTurnScore").text('');
    $("#playerTotalScore").text('');
  }else{
    $('#currentPlayer').text(GAME.players[i].name);
    $("#playerTurnScore").text(GAME.players[i].turnScore);
    $("#playerTotalScore").text(GAME.players[i].score);
  }

  //h2 #currentplayer
//<span id="playerTurnScore"></span>
//<span id="playerTotalScore"></span>
}

// function swapColor () {
//   let cLBack = $('#currentPlayerTurn').css('background-color');
//   let cLText = $('#currentPlayerTurn').css('color');
//   let cRBack = $('#gameScoresCard').css('background-color');
//   let cRText = $('#gameScoresCard').css('color');
  
//   $('#currentPlayerTurn').css('background-color', cRBack);
//   $('#currentPlayerTurn').css('color', cRText);
//   $('#gameScoresCard').css('background-color', cLBack);
//   $('#gameScoresCard').css('color', cLText);
// }



$(document).ready(function () {
  let GAME = new Game();
  
  $('#holdButton').prop('disabled','true');

  $('#settingsButton').click(function () {
    $('#addPlayerForm').toggle();
    $('#addNewPlayer').val('');
    $('#setup').toggle();
  });

  $('#deleteButton').click(function () {
    if(GAME.playerCount > 0){
      let playerDeletedIndex = $('#playersSelect option:selected').val();
      GAME.players.splice(playerDeletedIndex,1);
      GAME.playerCount--;
      GAME.resetGame();
      updateDropdown($('#playersSelect'), GAME);
      displayCurrentPlayerTurn(GAME);
      updatePlayerListScore ($('#playerScoreList'),GAME);
      
    }
  });

  $("#addPlayerForm").submit(function() {
    event.preventDefault();
    const inputtedPlayer = $("input#addNewPlayer").val();
    $("input#addNewPlayer").val("");
    GAME.addPlayer(new Player(inputtedPlayer));
    GAME.resetGame();
    updatePlayerListScore ($('#playerScoreList'), GAME);
    displayCurrentPlayerTurn(GAME);
    $('#currentPlayerCard').show();
    $('#gameScoresCard').show();
    $('#newGameButton').show();


    updateDropdown($('#playersSelect'),GAME);
    $('#results').hide();
    
  });

  $("#newGameButton").click(function () {
    GAME.resetGame();
    $('#holdButton').prop('disabled',true);
    updatePlayerListScore ($('#playerScoreList'),GAME);
    displayCurrentPlayerTurn(GAME);
    $('#results').hide();
    $('#gameScoresCard').show();
    $('#currentPlayerCard').show();
  });

  $('#rollButton').click(function () {
    if(GAME.gameVariation === "oneDice") {
      let DICE = GAME.rollDice();
      $('#dice1Img').attr('src', 'img/red_dice'+ DICE + '.png');
      $("#dice2Img").hide();
      let turn = GAME.turn( DICE);
      if(turn){
        $('#holdButton').prop('disabled',false);
        if(GAME.players[GAME.currentPlayerIndex].totalScore() >= 100) {
          $('#winner').text('Congrats ' + GAME.players[GAME.currentPlayerIndex].name + '!');
          GAME.players[GAME.currentPlayerIndex].submitTurnScore();
          //GAME.sortPlayersByScore();
          updatePlayerListScore ($('#scores'), GAME);
          $('#results').show();
          $('#gameScoresCard').hide();
          $('#currentPlayerCard').hide();
        }
      }else{
        GAME.nextPlayer();
        //swapColor();
        $('#holdButton').prop('disabled',true);
      }
    } else if (GAME.gameVariation === "twoDice") {
      let dice1 = GAME.rollDice();
      let dice2 = GAME.rollDice();
      $("#dice2Img").show();
      $('#dice1Img').attr("src", "img/red_dice" + dice1 + ".png");
      $('#dice2Img').attr("src", "img/red_dice" + dice2 + ".png");
      
      let turn = GAME.twoDiceTurn(dice1, dice2);
      $('#holdButton').prop('disabled',turn);
      


      if(GAME.players[GAME.currentPlayerIndex].totalScore() >= 100) {
        $('#winner').text('Congrats ' + GAME.players[GAME.currentPlayerIndex].name + '!');
        GAME.players[GAME.currentPlayerIndex].submitTurnScore();
        //GAME.sortPlayersByScore();
        updatePlayerListScore ($('#scores'), GAME);
        $('#results').show();
        $('#gameScoresCard').hide();
        $('#currentPlayerCard').hide();
      }

    }
    
    updatePlayerListScore ($('#playerScoreList'), GAME);
    displayCurrentPlayerTurn(GAME);
  });
  $('#holdButton').click(function () {
    GAME.players[GAME.currentPlayerIndex].submitTurnScore();
    GAME.nextPlayer();
    //swapColor();
    updatePlayerListScore ($('#playerScoreList'), GAME);
    displayCurrentPlayerTurn(GAME);
    $('#holdButton').prop('disabled',true);
    //$('#holdButton').prop('disabled','true');

  });

  $("#gameSelect").change(function() {
    GAME.gameVariation = $('#gameSelect option:selected').val();
    GAME.resetGame();
    updatePlayerListScore ($('#playerScoreList'), GAME);
    displayCurrentPlayerTurn(GAME);
    $('#currentPlayerCard').show();
    $('#gameScoresCard').show();
    $('#newGameButton').show();

    
  });
});
