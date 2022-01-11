'use strict';

export default class PopUp {
  constructor() {
    // 관련 요소 모두 가져오기
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    // 클릭 시 이벤트 처리 선언
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  // 클릭 이벤트 붙이기
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showPopUpWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}
