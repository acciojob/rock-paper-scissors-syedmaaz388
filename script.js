//your code here
// Store the elements in variables for easier access
const gameNumberInput = document.getElementById("game-number");
const playButton = document.getElementById("play-game");
const choices = document.querySelectorAll(".choice");
const roundResult = document.querySelector("[data-ns-test='round-result']");
const roundsLeft = document.querySelector("[data-ns-test='rounds-left']");
const userPoints = document.querySelector("[data-ns-test='user-points']");
const computerPoints = document.querySelector("[data-ns-test='computer-points']");
const gameResult = document.querySelector("[data-ns-test='game-result']");

// Define the computer's choices
const computerChoices = ["ROCK", "PAPER", "SCISSORS"];

// Initialize game variables
let turnsLeft, userScore, computerScore;

// Event listener for the play button
playButton.addEventListener("click", startGame);

// Event listeners for the user choices
choices.forEach(choice => {
  choice.addEventListener("click", playRound);
});

// Start the game
function startGame() {
  turnsLeft = parseInt(gameNumberInput.value);
  userScore = 0;
  computerScore = 0;

  roundsLeft.textContent = turnsLeft;
  userPoints.textContent = userScore;
  computerPoints.textContent = computerScore;
  gameResult.textContent = "";

  enableChoices();
}

// Enable user choices
function enableChoices() {
  choices.forEach(choice => {
    choice.disabled = false;
  });
}

// Disable user choices
function disableChoices() {
  choices.forEach(choice => {
    choice.disabled = true;
  });
}

// Play a round of the game
function playRound(event) {
  const userChoice = event.target.getAttribute("data-ns-test");
  const computerChoice = computerChoices[Math.floor(Math.random() * 3)];

  roundResult.textContent = "";

  if (userChoice === computerChoice) {
    roundResult.textContent = "TIE";
  } else if (
    (userChoice === "rock" && computerChoice === "SCISSORS") ||
    (userChoice === "paper" && computerChoice === "ROCK") ||
    (userChoice === "scissors" && computerChoice === "PAPER")
  ) {
    roundResult.textContent = "WON";
    userScore++;
  } else {
    roundResult.textContent = "LOSE";
    computerScore++;
  }

  turnsLeft--;
  roundsLeft.textContent = turnsLeft;
  userPoints.textContent = userScore;
  computerPoints.textContent = computerScore;

  if (turnsLeft === 0) {
    disableChoices();
    endGame();
  }
}

// End the game and display the result
function endGame() {
  if (userScore === computerScore) {
    gameResult.textContent
