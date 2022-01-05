// <아이템 추가하는 함수>
const addItemInput = document.querySelector('#add-item-input');
const addBtn = document.querySelector('.add-btn');
const shoppingListMain = document.querySelector('.shopping-list-main');

function addItem() {
  idNum += 1;
  const divEl = document.createElement('div');
  divEl.setAttribute('class', 'item-box');
  divEl.innerHTML = `
      <input type="checkbox"">
      <p class="item-name">${addItemInput.value}</p>
      <div class="delete-item-btn"><i class="fas fa-trash-alt"></i></div>
  `;
  shoppingListMain.append(divEl);
  addItemInput.value = '';
}
//빈 값일 때 클릭 시 추가 방지
if (addItemInput.value !== '') {
  addBtn.addEventListener('click', addItem);
}
//빈값이 기본값이라 변화 시에만 추가됨으로 빈값을 넣을 수 없음으로 따로 예외 처리 없음
addItemInput.addEventListener('change', addItem);

// <아이템 삭제하는 함수>
function deleteItem(event) {
  // checkbox에 class명이 없어서 오류나서 예외처리
  if (event.target.getAttribute('class') == null) return;
  if (event.target.getAttribute('class').includes('fa-trash-alt')) {
    event.target.parentElement.parentElement.remove();
  }
}
shoppingListMain.addEventListener('click', deleteItem);

// <아이템 체크하는 함수>
function checkItem(event) {
  const target = event.target.nextElementSibling;
  if (event.target.getAttribute('type').includes('checkbox')) {
    if (target.getAttribute('class').includes('line-deco')) {
      target.classList.remove('line-deco');
    } else {
      target.classList.add('line-deco');
    }
  }
}
shoppingListMain.addEventListener('input', checkItem);
