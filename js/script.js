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
  let finalScoreText = document.querySelector(".vertical-container");

  let finalWinner =
    scoreTracker[PLAYER].win > scoreTracker[COMPUTER].win
      ? "Congratulations, you are the winner!"
      : scoreTracker[PLAYER].win < scoreTracker[COMPUTER].win
      ? "Sorry :(, computer is the winner!"
      : "Yey, it's a tie!";

  finalScoreText.appendChild(
    createElement(
      "div",
      createElement("h2", finalWinner),
      createElement(
        "p",
        `Player has won ${scoreTracker[PLAYER].win} games and lost ${
          ROUND - scoreTracker[PLAYER].win - scoreTracker[TIE].win
        } games.`
      ),
      createElement(
        "p",
        `Computer has won ${scoreTracker[COMPUTER].win} games and lost ${
          ROUND - scoreTracker[COMPUTER].win - scoreTracker[TIE].win
        } games.`
      ),
      createElement(
        "p",
        `Player and computer tied ${scoreTracker[TIE].win} times.`
      ),
      createElement("button", "Play Again")
    )
  );

  let div = document.querySelector(".vertical-container > div:last-child");
  div.classList.add("final-score");

  let button = document.querySelector("button");
  button.addEventListener("click", restartGame);
}

function createElement(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != "string") {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(child));
    }
  }
  return node;
}

// one round of Rock Paper and Scissors
function playRound(e) {
  let playerInput;
  let computerInput = computerPlay();
  let round = document.querySelector(".round");
  let scoreUpdate = document.querySelector(".game-score-update");

  let gameArea = document.querySelector(".game-area");

  e.target.classList.forEach((classItem) => {
    if (classItem.match(/scissors|rock|paper/)) {
      playerInput = classItem;
      console.log(playerInput);
    }
  });

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

  console.log(scoreTracker);
  console.log(computerInput);

  // scoreUpdate.classList.add("fade-in-out").remove("fade-in-out");

  scoreUpdate.classList.add("fade-in-out");

  scoreUpdate.addEventListener(
    "animationend",
    (e) => {
      e.target.classList.remove("fade-in-out");
      console.log("animation ended", e.target);

      round.textContent = +round.textContent + 1;
      scoreTracker[winner].win++;

      if (round.textContent > ROUND) {
        gameArea.classList.add("not-visible");
        finalScoreMessage();
      }
    },
    { once: true }
  );

  scoreUpdate.textContent = outcomeMessage(winner, playerInput, computerInput);
}

function restartGame(e) {
  let gameArea = document.querySelector(".game-area");
  gameArea.classList.remove("not-visible");

  let finalScore = document.querySelector(".final-score");
  finalScore.parentNode.removeChild(finalScore);

  let round = document.querySelector(".round");
  round.textContent = 1;

  let scoreUpdate = document.querySelector(".game-score-update");
  scoreUpdate.textContent = "";

  scoreTracker.computer.win = 0;
  scoreTracker.player.win = 0;
  scoreTracker.tie.win = 0;
}

// user selects a choice and the game begins!
let playerChoices = document.querySelectorAll(".game-box");

playerChoices.forEach((choice) => {
  choice.addEventListener("click", playRound);
});
