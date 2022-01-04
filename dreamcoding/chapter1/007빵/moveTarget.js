// const targetEl = document.querySelector('.target');
// const targetCordinateEl = document.querySelector('.target-cordinates');
// const rowEl = document.querySelector('.row');
// const colunmEl = document.querySelector('.column');

// window.addEventListener('mousemove', () => {
//   targetEl.style.left = event.pageX - 8 + 'px';
//   targetEl.style.top = event.pageY - 8 + 'px';
//   targetCordinateEl.textContent = `${event.pageX}px, ${event.pageY}px`;
//   rowEl.style.top = event.pageY + 'px';
//   colunmEl.style.left = event.pageX + 'px';
// });

const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', (event) => {
  // 반복되는 속성호출을 변수에 담아서 반복을 줄이자~!
  const x = event.clientX;
  const y = event.clientY;

  vertical.style.left = `${x}px`;
  horozontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.innerHTML = `${x}px, ${y}px`;
});
