"use strict";

// Player Roll button, score and div element
const player0Button = document.querySelector(".player0Button");
const player1Button = document.querySelector(".player1Button");
const restartButton = document.querySelector(".restart");
const p0Score = document.querySelector(".player0Score");
const p1Score = document.querySelector(".player1Score");
const player0 = document.querySelector(".player0");
const player1 = document.querySelector(".player1");

// player icon source
const player0Icon = "digits/star.png";
const player1Icon = "digits/moon.png";
const playerBothIcon = "digits/sun.png";
//imgDice element
const imgDice = document.querySelector(".imgDice");

// global variables

let player0Score, player1Score, activePlayer, playState, winNum;

function init() {
  //Initial condition
  playState = true;
  winNum = 35;
  p0Score.textContent = 0;
  p1Score.textContent = 0;
  player0Score = 0;
  player1Score = 0;
  activePlayer = 0;

  //set player0's background to green
  player1.classList.remove("green");
  player0.classList.add("green");
}

init();

// logic functions///

// Dice roll show
function diceRollShow() {
  const roll = Math.trunc(Math.random() * 6) + 1;
  imgDice.src = `dice/dice-${roll}.png`;
  return roll;
}

// player's turn color
function playerTurnColor() {
  if (activePlayer === 0) {
    player0.classList.remove("green");
    player1.classList.add("green");
  } else {
    player1.classList.remove("green");
    player0.classList.add("green");
  }
}

// Replace player's previous position with digit  || remove  player icon
function restoreDigit(prevScore) {
  document.getElementById(`item_${prevScore}`).src = `digits/${prevScore}.png`;
}

// two player icon to 1 player icon  || remove  player icon
function twoIconToOne(score) {
  if (activePlayer === 0)
    document.getElementById(`item_${score}`).src = player1Icon;
  else {
    document.getElementById(`item_${score}`).src = player0Icon;
  }
}

// player icon replaces digit icon
function playerTakesDigit(score) {
  if (activePlayer === 0)
    document.getElementById(`item_${score}`).src = player0Icon;
  else {
    document.getElementById(`item_${score}`).src = player1Icon;
  }
}

// one icon to two icon
function oneIconToTwo(score) {
  document.getElementById(`item_${score}`).src = playerBothIcon;
}

// Put Icon
function putPlayerIcon(playerScore) {
  ////Put player icon
  // if there is no existing player on current score --- replace digit with player icon
  if (player0Score != player1Score) {
    playerTakesDigit(playerScore);
  }
  // if there existing player on current score --- replace that icon with 2player icon
  else {
    oneIconToTwo(playerScore);
  }
}

//play function
function play(playerScore, playerCurrElement, otherScore) {
  playerTurnColor(activePlayer);
  // Roll dice
  const roll = diceRollShow();
  const prevScore = playerScore;
  playerScore += roll;
  // check for winning condition
  if (playerScore >= winNum) {
    // show player wins
    if (activePlayer === 0) {
      p0Score.textContent = playerScore;
      console.log("player 1 wins!");
    } else {
      p1Score.textContent = playerScore;
      console.log("player 2 wins!");
    }
    playState = false;
  } else {
    // set playerscore globally
    activePlayer === 0
      ? (player0Score = playerScore)
      : (player1Score = playerScore);
    // show current score
    playerCurrElement.textContent = playerScore;

    ////Remove player icon from previous position
    // First Roll (conditon playerscore is ===0) -- No need to remove
    if (prevScore === 0) {
      putPlayerIcon(playerScore);
    }
    // Not first Roll and players scores are different ---  Remove player icon from previous position
    else if (prevScore != otherScore) {
      //remove icon from previous place
      restoreDigit(prevScore);
      putPlayerIcon(playerScore);
    }

    // Not first Roll and players scores are same -- Remove 2player icon and put other players icon to that position
    else {
      twoIconToOne(prevScore);
      putPlayerIcon(playerScore);
    }
  }
}

player0Button.addEventListener("click", function () {
  if (activePlayer === 0 && playState) {
    play(player0Score, p0Score, player1Score);
    playState ? (activePlayer = 1) : (activePlayer = 0);
  }
});

player1Button.addEventListener("click", function () {
  if (activePlayer === 1 && playState) {
    play(player1Score, p1Score, player0Score);
    playState ? (activePlayer = 0) : (activePlayer = 1);
  }
});

restartButton.addEventListener("click", function () {
  document.getElementById(
    `item_${player0Score}`
  ).src = `digits/${player0Score}.png`;

  document.getElementById(
    `item_${player1Score}`
  ).src = `digits/${player1Score}.png`;
  init();
});
/*

//Player 0
player0Button.addEventListener("click", function () {
  if (activePlayer === 0) {
    // show player turn
    playerTurnColor(activePlayer);
    //Roll dice
    const roll = diceRollShow();
    const prevScore = player0Score;
    player0Score += roll;
    const playerScore = player0Score;
    const otherScore = player1Score;
    //show current score
    p0Score.textContent = playerScore;

    ////Remove player icon from previous position
    // First Roll (conditon playerscore is ===0) -- No need to remove
    if (prevScore === 0) {
      putPlayerIcon(playerScore, activePlayer);
    }
    // Not first Roll and players scores are different ---  Remove player icon from previous position
    else if (prevScore != otherScore) {
      //remove icon from previous place
      restoreDigit(prevScore);
      putPlayerIcon(playerScore, activePlayer);
    }

    // Not first Roll and players scores are same -- Remove 2player icon and put other players icon to that position
    else {
      twoIconToOne(prevScore, activePlayer);

      putPlayerIcon(playerScore, activePlayer);
    }
  }
  activePlayer = 1;
});

player1Button.addEventListener("click", function () {
  if (activePlayer === 1) {
    playerTurnColor(activePlayer);
    //Roll dice
    const roll = diceRollShow();
    const prevScore = player1Score;
    player1Score += roll;
    const playerScore = player1Score;
    const otherScore = player0Score;
    //show current score
    p1Score.textContent = playerScore;

    if (prevScore === 0) {
      putPlayerIcon(playerScore, activePlayer);
    }
    // Not first Roll and players scores are different ---  Remove player icon from previous position
    else if (prevScore != otherScore) {
      //remove icon from previous place
      restoreDigit(prevScore);
      putPlayerIcon(playerScore, activePlayer);
    }

    // Not first Roll and players scores are same -- Remove 2player icon and put other players icon to that position
    else {
      twoIconToOne(prevScore, activePlayer);
      putPlayerIcon(playerScore, activePlayer);
    }
  }
  activePlayer = 0;
});
*/
