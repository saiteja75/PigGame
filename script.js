'use strict';
let getRandomNumber = function() {
    return Math.trunc(Math.random() * 6) + 1;
}
let setActivePlayer = function(player) {
    activePlayer = player;
    player.active = true;
    player.element.classList.add('player--active');
}
let removeActivePlayer = function(player) {
    player.active = false;
    player.element.classList.remove('player--active');
}
let getPlayerValues = function(player) {
    let playerObj = {};
    playerObj.element = document.querySelector('.' + player);
    playerObj.totalScore = Number(playerObj.element.querySelector('.score').textContent);
    playerObj.currentScore = Number(playerObj.element.querySelector('.current-score').textContent);
    playerObj.active = false;
    return playerObj;
}
let setPlayerValues = function(player) {
    player.element.querySelector('.score').textContent = player.totalScore;
    player.element.querySelector('.current-score').textContent = player.currentScore;
}
let resetGame = function() {
    for (let i = 0; i < playersObj.length; i++) {
        playersObj[i].currentScore = 0;
        playersObj[i].totalScore = 0;
        setPlayerValues(playersObj[i]);
        playersObj[i].element.classList.remove('player--active');
    }
    dice.classList.add('hidden');
    setActivePlayer(playersObj[0]);
}
let switchPlayer = function() {
    if (activePlayer.active == playersObj[0].active) {
        removeActivePlayer(playersObj[0]);
        setActivePlayer(playersObj[1]);
    } else {
        removeActivePlayer(playersObj[1]);
        setActivePlayer(playersObj[0]);
    }
}
let holdGame = function() {
    activePlayer.totalScore += activePlayer.currentScore;
    activePlayer.currentScore = 0;
    setPlayerValues(activePlayer);
    if (activePlayer.totalScore >= 100) {
        console.log(player);
        resetGame();
    } else {
        switchPlayer();
    }
}
let rollDice = function() {
    let randNumber = getRandomNumber();
    if (dice.classList.contains('hidden')) {
        dice.classList.remove('hidden');
    }
    dice.src = `dice-${randNumber}.png`;
    if (randNumber == 1) {
        activePlayer.currentScore = 0;
        setPlayerValues(activePlayer);
        switchPlayer();
    } else {
        activePlayer.currentScore += randNumber;
        setPlayerValues(activePlayer);
    }
}
let playersObj = [getPlayerValues('player--0'), getPlayerValues('player--1')];
let dice = document.querySelector('.dice');
let roll = document.querySelector('.btn--roll');
let newGame = document.querySelector('.btn--new');
let hold = document.querySelector('.btn--hold');
playersObj[0].active = true;
let activePlayer = playersObj[0].active ? playersObj[0] : playersObj[1];
roll.addEventListener('click', rollDice);
newGame.addEventListener('click', resetGame);
hold.addEventListener('click', holdGame);
resetGame();