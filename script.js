const state = {
    round: 1,
    lastNum: 5,
    isNewGame: true,
    lives: 3,
    score: 0,
    previousGuesses: [],
  };

  const previousGuesses = document.getElementById("previousGuesses");
  const message = document.getElementById("message");
  const lives = document.getElementById("lives");
  const score = document.getElementById("score");
  const guessField = document.getElementById("guessField");
  const guessForm = document.getElementById("guessForm");

  let randInt = Math.floor(Math.random() * state.lastNum) + 1;

  const updateLives = () => {
    lives.textContent = Array(state.lives).fill("❤️").join("");
  };

  const updateScore = () => {
    score.textContent = `Your score is ${state.score}`;
  };

  const updatePreviousGuesses = () => {
    previousGuesses.textContent = `Previous guesses: ${state.previousGuesses.join(", ")}`;
  };

  const resetGame = () => {
    state.round = 1;
    state.lastNum = 5;
    state.lives = 3;
    state.score = 0;
    state.previousGuesses = [];
    updateScore();
    updateLives();
    randInt = Math.floor(Math.random() * state.lastNum) + 1;
    message.textContent = `Guess a number between 1 and ${state.lastNum}`;
  };

  const handleGameOver = () => {
    message.textContent = `Game over! The number was ${randInt}. Starting a new game...`;
    setTimeout(() => {
      resetGame();
    }, 3000);
  };

  const handleGuess = (event) => {
    event.preventDefault(); // Prevent form submission (page refresh)

    const guess = Number(guessField.value);
    if (!guess || guess < 1 || guess > state.lastNum) {
      message.textContent = `Please enter a valid number between 1 and ${state.lastNum}.`;
      guessField.value = ""; // Clear the field
      return;
    }

    state.previousGuesses.push(guess);
    updatePreviousGuesses();

    if (guess === randInt) {
      state.score += state.round;
      state.round++;
      state.lastNum += 5;
      state.lives = 3 * (state.round + 1);
      updateLives();
      randInt = Math.floor(Math.random() * state.lastNum) + 1;

      message.textContent = `Correct! Guess a number between 1 and ${state.lastNum}`;
      guessField.value = ""; // Clear the input field after a correct guess
      guessField.focus();
    } else {
      state.lives--;
      updateLives();

      if (state.lives === 0) {
        handleGameOver();
      } else {
        message.textContent = `Wrong! Try again!`;
        guessField.value = ""; // Clear the input field after a wrong guess
        guessField.focus();
      }
    }
  };

  // Attach the form submit event listener
  guessForm.addEventListener("submit", handleGuess);
  resetGame(); // Initialize the game when the page loads