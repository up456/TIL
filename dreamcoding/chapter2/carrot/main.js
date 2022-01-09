const playBtn = document.querySelector('.play-btn');
const modals = document.querySelector('.modals');
const replayModal = document.querySelector('.replay-modal');
const lostModal = document.querySelector('.lost-modal');
const wonModal = document.querySelector('.won-modal');

const gameArea = document.querySelector('.game-area');
const carrotCounter = document.querySelector('.carrot-counter');

// 사운드 부분
const carrotPull = document.querySelector('#carrot-pull');
const bugPull = document.querySelector('#bug-pull');
const gameOver = document.querySelector('#game-over');
const gameWin = document.querySelector('#game-win');
const bgm = document.querySelector('#bgm');

let carrot = 10;
function playGame() {
  playBtn.textContent = '■';
  bgm.play();
  playTimer();
  setItems();
  carrot = 10;
  carrotCounter.textContent = carrot;
}

gameArea.addEventListener('click', (event) => {
  rolePlay(event);
});

function rolePlay(event) {
  // 벌레를 클릭한다 -> 게임에서 패배한다.
  if (event.target.getAttribute('class') === 'bug') {
    bugPull.play();
    gameOver.play();
    return stopGame(lostModal);
  }
  // 당근을 클릭한다 -> 1. 당근의 이미지를 지운다. 2. 당근의 총개수-1를 한다.-> 당근의 총개수가 0이 된다. => 게임에서 승리한다.

  if (event.target.getAttribute('class') === 'carrot') {
    event.target.remove();
    carrot -= 1;
    carrotCounter.textContent = carrot;
    carrotPull.play();
    if (carrot === 0) {
      return stopGame(wonModal);
    }
  }
}
function setItems() {
  gameArea.innerHTML = `
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
    <img class="carrot" src="./img/carrot.png" alt="당근">
    <img class="bug" src="./img/bug.png" alt="벌레">
  `;
  mixPosition('.carrot');
  mixPosition('.bug');
}

gameArea.addEventListener('mouseover', (event) => {
  if (event.target.getAttribute('class') !== 'game-area') {
    event.target.style.transform = `${event.target.style.transform} scale(1.1)`;
  }
});
gameArea.addEventListener('mouseout', (event) => {
  if (event.target.getAttribute('class') !== 'game-area') {
    let transform = event.target.style.transform;
    let newTransform = transform.slice(0, transform.indexOf('scale'));
    event.target.style.transform = newTransform;
    // 이벤트 요소에 직접 접근하지 않고 변수에 담아서 접근하여 할당하면 정상적으로 작동하지 않을 수도 있다~!
    // transform = newTransform;
  }
});

function getRandom(num) {
  return Math.random() * num;
}
function mixPosition(target) {
  const items = document.querySelectorAll(target);
  items.forEach((item) => {
    const x = getRandom(1250);
    const y = getRandom(200);
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// 맨처음 게임을 시작하고, 멈추는 경우
playBtn.addEventListener('click', () => {
  if (playBtn.textContent === '▶') {
    playGame();
  } else {
    stopGame();
  }
});

//게임이 멈추는 경우 => 1. 다시하기 버튼을 눌렀을 경우, 2. 게임에서 졌을 경우, 3. 게임에서 이겼을 경우
function stopGame(modal = replayModal) {
  playBtn.classList.add('hidden');
  modal.classList.remove('hidden');
  stopTimer();
  bgm.pause();
  if (modal === wonModal) {
    return gameWin.play();
  }
  return gameOver.play();
}
// 다시하기 버튼 수행
function replayGame(modal) {
  playBtn.classList.remove('hidden');
  modal.classList.add('hidden');
  return playGame();
}

// 모달별로 다시시작 버튼 보여주기
modals.addEventListener('click', (event) => {
  if (event.target.dataset.key === undefined) {
    return;
  }
  if (event.target.dataset.key === 'replay') {
    if (event.target.dataset.modal === 'replay') {
      return replayGame(replayModal);
    } else if (event.target.dataset.modal === 'lost') {
      return replayGame(lostModal);
    } else {
      return replayGame(wonModal);
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
      return stopGame(lostModal);
    }
  }, 1000);
}

function stopTimer() {
  return clearInterval(timeCounter);
}
