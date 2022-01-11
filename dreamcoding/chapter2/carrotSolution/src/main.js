'use strict';
import PopUp from './popup.js';
import Field from './field.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const gmaeTimer = document.querySelector('.game__timer');
const gmaeScore = document.querySelector('.game__score');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(event) {
  if (!started) {
    return;
  }
  if (item == 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item == 'carrot') {
    finishGame(false);
  }
}

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showPopUpWithText('REPLAY❓');
  playSound(alertSound);
  stopSound(bgSound);
}
function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  gameFinishBanner.showPopUpWithText(win ? 'YOU WON' : 'YOU LOST');
}

function showTimerAndScore() {
  gmaeTimer.style.visibility = 'visible';
  gmaeScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      stopGameTimer();
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gmaeTimer.innerText = `${minutes}:${seconds}`;
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function initGame() {
  score = 0;
  gmaeScore.innerText = CARROT_COUNT;
  gameField.init();
}

function onFiledClick(event) {
  if (!started) {
    return;
  }
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
function updateScoreBoard() {
  gmaeScore.innerText = CARROT_COUNT - score;
}
