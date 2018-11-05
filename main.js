'use strict'
//normal variables and _DOM variables
//cashing the DOM - storing sth for future use
var playerScore = 0;
var computerScore = 0;
var playerScore_span = document.getElementById('player-score');
var computerScore_span = document.getElementById('computer-score');
var scoreBoard_div = document.querySelector('.score-board');
var result_p = document.querySelector('.result');
var rock_div = document.getElementById('r');
var paper_div = document.getElementById('p');
var scissors_div = document.getElementById('s');
var gameRounds; //3 krok
var message = document.getElementById('prompt-message')
var panel_div = document.getElementById('panel');
var output_div = document.getElementById('output');
var rounds_div = document.getElementById('rounds');
var post_game_div = document.getElementById('post-game-panel');
// var post_game_img = document.getElementById('post-game-img');
// var final_div = document.getElementById('score-final');
//Co ma sie dziac po kliknieciu na guzik?
// Np. jak klikamy na kamien, to bierzemy ten wynik i porownojemy z wyborem komputera - czyli randomowym wyborem z 3 opcji;
// porownujemy te 2 wartosci i sprawdzamy kto wygral
// wyswietlamy wynik w DOMie


// step 3
panel_div.style.display = 'none';

var gameButton = document.getElementById('new-game');

function updateScores() {
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
}

gameButton.addEventListener('click', function () {
    newGame()
});
var newGame = function () {
    gameRounds = window.prompt('How many points to win?');
    if (gameRounds == "" || gameRounds <= 0 || isNaN(gameRounds)) {
        panel_div.style.display = 'none';
        message.innerHTML = 'Input must be a number';
    } else {
        playerScore = 0;
        computerScore = 0;
        panel_div.style.display = 'inline';
        rounds_div.innerHTML = "You need: <strong>" + gameRounds + "</strong> points to win with the computer";
        post_game_div.style.display = 'none';
        result_p.innerHTML = "";
        updateScores();
    }
}

//funkcje gry
function getComputerChoice() {
    // w zmiennej tablica dostepnych wyborow
    var choices = ['r', 'p', 's'];
    //wbudowana funkcja daje randomowa liczbe miedzy 0 a 1
    //mnozymy przez 3 - nigdy nie osiagnie 3; musimy zaokraglic;
    var randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
};
// console.log(getComputerChoice());

//funkcja przerabiajaca na slowa
function convertLetters(letter) {
    if (letter === 'r') return 'Rock';
    if (letter === 'p') return 'Paper';
    else return 'Scissors';
};

// funkcje wygrana przegrana i remis

function win(playerChoice, computerChoice) {
    playerScore++;
    updateScores();
    result_p.innerHTML = convertLetters(playerChoice) + ' beats ' + convertLetters(computerChoice) + '. You win! ';
    //pokazuje r beats s - wiec trzeba przerobic na slowa
}

function lose(playerChoice, computerChoice) {
    computerScore++;
    updateScores();
    result_p.innerHTML = convertLetters(computerChoice) + ' beats ' + convertLetters(playerChoice) + '. You lost! ';
}

function tie(playerChoice, computerChoice) {
    // playerScore_span.innerHTML = playerScore;
    // computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertLetters(playerChoice) + ' equals ' + convertLetters(computerChoice) + '. Its a tie!';
}

function endGame(playerWon) {
    panel_div.style.display = 'none';
    post_game_div.style.display = 'block';
    // post_game_img.src = playerWon ? "https://i.imgur.com/pHrVikp.gif" : "https://media1.tenor.com/images/394e3a452429d047efade7531ebde8ba/tenor.gif?itemid=7954646";
}

// glowna funkcja gry
function game(playerChoice) {
    var computerChoice = getComputerChoice();
    // console.log("player choice => " + playerChoice);
    // console.log('computer choice => ' + computerChoice);
    //jak klikam na kamien to player choice zawsze bedzie r a computer choice bedzie randomowy
    //teraz musimy porownac kto wygra

    //!!proba switch statement z sololearn zamiast if else
    switch (playerChoice + computerChoice) {
        //najpierw sytuacje gdzie player wygrywa
        case 'rs':
        case 'pr':
        case 'sp':
            console.log('PLAYER WINS');
            win(playerChoice, computerChoice);
            break;
            //teraz sytuacje gdzie player przegrywa
        case 'rp':
        case 'ps':
        case 'sr':
            console.log('PLAYER LOSES');
            lose(playerChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            console.log('TIE');
            tie(playerChoice, computerChoice);
            break;
            //  dziala <3
    }

    if (playerScore == gameRounds) {
        document.getElementById('score-final').innerHTML = "CONGRATULATIONS! YOU WIN WITH SCORE " + playerScore + ":" + computerScore + "!";
        console.log("CONGRATULATIONS! YOU WIN WITH SCORE " + playerScore + ":" + computerScore + "!");
        endGame(true);
    } else if (computerScore == gameRounds) {
        document.getElementById('score-final').innerHTML = "BAD LUCK! YOU LOSE WITH SCORE " + playerScore + ":" + computerScore + "!";
        console.log("BAD LUCK! YOU LOSE WITH SCORE " + playerScore + ":" + computerScore + "!");
        endGame(false);
    }
};

function main() {

    //dodajemy eventy na guzikach
    rock_div.addEventListener('click', function () {
        //funckcja tylko mowi, co sie wydarzylo - sprawdzamy czy dziala
        // console.log('Hey, you chose rock');
        game('r');
    });

    paper_div.addEventListener('click', function () {
        // console.log('Hey, you chose paper');
        game('p');
    });

    scissors_div.addEventListener('click', function () {
        // console.log('Hey, you chose scissors');
        game('s');
    });
}

main();