const playBtn = document.querySelector('.play-btn');
const modals = document.querySelector('.modals');
const replayModal = document.querySelector('.replay-modal');
const lostModal = document.querySelector('.lost-modal');
const wonModal = document.querySelector('.won-modal');

function playGame() {
  playBtn.textContent = '■';
  playTimer();
}

function stopGame() {
  playBtn.classList.add('hidden');
  replayModal.classList.remove('hidden');
  stopTimer();
}

function replayGame(modal) {
  playBtn.textContent = '▶';
  playBtn.classList.remove('hidden');
  modal.classList.add('hidden');
  playGame();
}

function lostGame() {
  playBtn.classList.add('hidden');
  lostModal.classList.remove('hidden');
}

playBtn.addEventListener('click', () => {
  if (playBtn.textContent === '▶') {
    playGame();
  } else {
    stopGame();
  }
});

// 모달 다시시작 버튼
modals.addEventListener('click', (event) => {
  if (event.target.dataset.key === undefined) {
    return;
  }
  if (event.target.dataset.key === 'replay') {
    if (event.target.dataset.modal === 'replay') {
      replayGame(replayModal);
    } else if (event.target.dataset.modal === 'lost') {
      replayGame(lostModal);
    } else {
      replayGame(wonModal);
    }
  }
});

// 타이머 부분
const timer = document.querySelector('.timer');

let timeCounter;
function playTimer() {
  let time = 11;
  timeCounter = setInterval(() => {
    time -= 1;
    timer.textContent = `0:${time}`;
    if (time == 0) {
      clearInterval(timeCounter);
      lostGame();
    }
  }, 100);
}
function stopTimer() {
  clearInterval(timeCounter);
}
