//Gemma Reina and Federico Diaz

const wordList = ["SPREAT", "CONTINUOUS", "MEADOW", "EXTEND", "ELEPHANT", "SHADOW", "PARADE", "MEASURE", "PRIVILEGE", "APATHY", "INSIST", "INFLATE", "TELEPHONE", "COINCIDE", "DISPOSITION", "CENTRAL", "MURDER", "LOCATE", "CERTAIN", "RAILCAR"];
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
let displayedWord = "_  ".repeat(selectedWord.length);
const wordDisplay = document.querySelector('.word-display');
wordDisplay.textContent = displayedWord;

let playerName= "";
let winCount = 0;
let lossCount = 0;
let usedLetters = [];
const maxAttempts = 9;
let wrongAttempts= 0;

//Function to Start a Round
function startGame(){
  playerName = document.getElementById('playerName').value;
  if (playerName.trim() !== '') {
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    document.getElementById('playerNameDisplay').textContent = `Player: ${playerName}`;
    document.getElementById('playerInfo').style.display = 'block';

    // Reset game variables
    wrongAttempts = 0;
    usedLetters = [];
    updateHangmanImage();
    updateGameInfo();
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    displayedWord = "_  ".repeat(selectedWord.length);
    wordDisplay.textContent = displayedWord;
  } else {
    alert('Please enter your name to start the game.');
  }

}

// Function to update the displayed player information
function updateGameInfo() {
  document.getElementById('winCount').textContent = winCount;
  document.getElementById('lossCount').textContent = lossCount;
  document.getElementById('usedLetters').textContent = usedLetters.join(', ');
}

// Function to validate the input for guessing
function validateInput(inputElement) {
  inputElement.value = inputElement.value.toUpperCase().replace(/[^A-Z]/g, '');
}

// Function to handle player guesses
function makeGuess(){
  const guessLetterInput = document.getElementById('guessLetter');
  const letter = guessLetterInput.value.toUpperCase();

  // Check if the letter has already been guessed
  if (usedLetters.includes(letter)) {
    alert('You have already guessed this letter. Try a different one.');
    return;
  }

  // Add the letter to the list of used letters
  usedLetters.push(letter);

  // Check if the letter is in the selected word
  let letterFound = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] == letter) {
      letterFound = true;
      displayedWord = displayedWord.substring(0, 3*i) + letter + displayedWord.substring(3*i + 1); 
    }
    wordDisplay.textContent = displayedWord;
  }

  if (!letterFound) {
    wrongAttempts++;
    updateHangmanImage();
  }

  // Update the game display
  wordDisplay.textContent = displayedWord;
  updateGameInfo();
  updateHangmanImage();

  // Check for game end conditions
  if (displayedWord.replace(/ /g, '')==selectedWord) {
    updateGameInfo();
    winCount++;
    setTimeout(function () {
      alert(`Congratulations, ${playerName}! You've won this round!`);
      startGame();
    }, 100);
  } else if (wrongAttempts >= maxAttempts) {
    updateGameInfo();
    lossCount++;
    setTimeout(function () {
      alert(`Oups! Looks like you lost, ${playerName}. Try harder to save the hangman next time! The word was: ${selectedWord}`);
      startGame();
    }, 100);
  }

  // Clear the guess input
  guessLetterInput.value = '';
}

//Function to update the image that displays the hangman
function updateHangmanImage() {
  const hangmanImg = document.getElementById('hangman-img');
  hangmanImg.src = `img/hangman_${Math.max(wrongAttempts-1, 0)}.png`;
}