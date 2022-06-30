// *** Welcome to Rock, Paper, Scissors ***
// Set up constant game variables
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// Set up cononstant for round number
const ROUND = 5;

// array of choices
const choice = [ROCK, PAPER, SCISSORS];

// Set up outcome constants
const PLAYER = "player";
const COMPUTER = "computer";
const TIE = "tie";

// Set up score tracker
const scoreTracker = {
  player: {
    win: 0,
  },
  computer: {
    win: 0,
  },
  tie: {
    win: 0,
  },
};

// Setting up randomized computer choice
const computerPlay = () => {
  // Choose a index between 0 and 2 inclusive
  let randomIndex = Math.floor(Math.random() * 3);

  // return the computer choice selected from the choice array
  return choice[randomIndex];
};

function outcomeMessage(outcome, playerInput, computerInput) {
  let message = "";

  switch (outcome) {
    case TIE:
      message = `No one wins! It is a TIE!`;
      break;

    case COMPUTER:
      message = `Sorry :( You Lose! ${computerInput} beats ${playerInput}`;
      break;

    case PLAYER:
      message = `Congratulation! You win! ${playerInput} beats ${computerInput}`;
      break;
    default:
      message = "Unknown input!";
  }

  return message;
}

function finalScoreMessage() {
  let finalWinner =
    scoreTracker[PLAYER].win > scoreTracker[COMPUTER].win
      ? "Yey, player is the winner!"
      : scoreTracker[PLAYER].win < scoreTracker[COMPUTER].win
      ? "Yey, computer is the winner!"
      : "Yey, it's a tie!";

  return `${finalWinner}

  Score Breakdown:
  Player has won ${scoreTracker[PLAYER].win} games and lost ${
    ROUND - scoreTracker[PLAYER].win - scoreTracker[TIE].win
  } games.
  Computer has won ${scoreTracker[COMPUTER].win} games and lost ${
    ROUND - scoreTracker[COMPUTER].win - scoreTracker[TIE].win
  } games.
  Player and computer tied ${scoreTracker[TIE].win} times.`;
}

// one round of Rock Paper and Scissors
function playRound(playerInput = SCISSORS, computerInput = PAPER) {
  /* ***Game rules***
    Rock and Paper => Paper wins
    Rock and Scissors => Rock wins
    Rock and Rock => Tie

    Paper and Paper => Tie
    Paper and Scissors => Scissors win
    Paper and Rock => Paper wins

    Scissors and Paper => Scossors win
    Scissors and Scissors => Tie
    Scissors and Rock => Rock wins
  */

  // Set up a winner variable
  let winner = TIE;

  // Testing against player input
  switch (playerInput) {
    // Player Input ROCK
    case ROCK:
      switch (computerInput) {
        case PAPER:
          winner = COMPUTER;
          break;
        case SCISSORS:
          winner = PLAYER;
          break;
        case ROCK:
          winner = TIE;
          break;
      }
      break;

    // Player Input PAPER
    case PAPER:
      switch (computerInput) {
        case PAPER:
          winner = TIE;
          break;
        case SCISSORS:
          winner = COMPUTER;
          break;
        case ROCK:
          winner = PLAYER;
          break;
      }
      break;

    // Player Input SCISSORS
    case SCISSORS:
      switch (computerInput) {
        case PAPER:
          winner = PLAYER;
          break;
        case SCISSORS:
          winner = TIE;
          break;
        case ROCK:
          winner = COMPUTER;
          break;
      }
      break;
  }

  return winner;
}

function game() {
  let playerInput;
  let computerInput;

  for (let i = 1; i <= ROUND; i++) {
    // Get player input
    playerInput = prompt(
      "Please select: Rock, Paper or Scissors: "
    ).toLowerCase();

    // Get computer input
    computerInput = computerPlay();

    console.log("Computer Input", computerInput);

    let winner = playRound(playerInput, computerInput);

    // Show the outcome message for the round
    alert(outcomeMessage(winner, playerInput, computerInput));

    // Update the score keeper
    scoreTracker[winner].win++;
  }
  alert(finalScoreMessage());
  console.log(scoreTracker);
}

// Play the Game
game();
