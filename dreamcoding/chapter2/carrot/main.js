const playBtn = document.querySelector('.play-btn');
const modals = document.querySelector('.modals');
const replayModal = document.querySelector('.replay-modal');
const lostModal = document.querySelector('.lost-modal');
const wonModal = document.querySelector('.won-modal');

const gameArea = document.querySelector('.game-area');
const carrotCounter = document.querySelector('.carrot-counter');

let carrot = 4;

function playGame() {
  playBtn.textContent = '■';
  playTimer();
  // 아이템을 셋팅한다()
  setItems();
  carrot = 4;
  gameArea.addEventListener('click', (event) => {
    rolePlay(event);
  });
}

function rolePlay(event) {
  // 벌레를 클릭한다 -> 게임에서 패배한다.
  if (event.target.getAttribute('class') === 'bug') {
    return stopGame(lostModal);
  }
  // 당근을 클릭한다 -> 1. 당근의 이미지를 지운다. 2. 당근의 총개수-1를 한다.-> 당근의 총개수가 0이 된다. => 게임에서 승리한다.

  if (event.target.getAttribute('class') === 'carrot') {
    event.target.remove();
    carrot -= 1;
    carrotCounter.textContent = carrot;
    if (carrot === 0) {
      stopGame(wonModal);
    }
  }
}
function setItems() {
  gameArea.innerHTML = `
  <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="bug" src="./img/bug.png" alt="벌레">`;
}

// 맨처음 게임을 시작하고, 멈추는 경우
playBtn.addEventListener('click', () => {
  if (playBtn.textContent === '▶') {
    playGame();
  } else {
    stopGame();
  }
});

//게임이 멈춘느 경우 => 1. 다시하기 버튼을 눌렀을 경우, 2. 게임에서 졌을 경우, 3. 게임에서 이겼을 경우
function stopGame(modal = replayModal) {
  playBtn.classList.add('hidden');
  modal.classList.remove('hidden');
  stopTimer();
}
// 다시하는 경우도 위과 같음
function replayGame(modal) {
  playBtn.textContent = '▶';
  playBtn.classList.remove('hidden');
  modal.classList.add('hidden');
  playGame();
}

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
      stopGame(lostModal);
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timeCounter);
}
