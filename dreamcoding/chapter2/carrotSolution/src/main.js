'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const game = new Game(3, 2, 2);
const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay?';
      break;
    case 'win':
      message = 'YOU WON';
      break;
    case 'lose':
      message = 'YOU LOST';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showPopUpWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
