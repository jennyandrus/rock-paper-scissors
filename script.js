const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".choice");
const resultText = document.getElementById("resultText");
const playerChoiceDisplay = document.getElementById("playerChoice");
const computerChoiceDisplay = document.getElementById("computerChoice");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "reset") {
            resetGame();
            return;
        }
        
        button.classList.add('bounce');
        setTimeout(() => button.classList.remove('bounce'), 500);

        clickSound.play();
        const playerChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        playerChoiceDisplay.textContent = `You chose: ${playerChoice}`;
        computerChoiceDisplay.textContent = `Computer chose: ${computerChoice}`;
        
        const result = determineWinner(playerChoice, computerChoice);
        resultText.textContent = result;
        if (result === "You win!") {
            winSound.play();
            playerScore++;
        } else if (result === "You lose!") {
            loseSound.play();
            computerScore++;
        }
        updateScores();
    });
});

function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

function updateScores() {
    const playerScoreElement = document.getElementById("playerScore");
    const computerScoreElement = document.getElementById("computerScore");

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

    playerScoreElement.classList.add('scale');
    computerScoreElement.classList.add('scale');

    setTimeout(() => {
        playerScoreElement.classList.remove('scale');
        computerScoreElement.classList.remove('scale');
    }, 500);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    resultText.textContent = "Make your choice!";
    playerChoiceDisplay.textContent = "";
    computerChoiceDisplay.textContent = "";
}
