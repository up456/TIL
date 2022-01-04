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

addEventListener('load', (event) => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener('mousemove', (event) => {
    // 반복되는 속성호출을 변수에 담아서 반복을 줄이자~!
    const x = event.clientX;
    const y = event.clientY;

    vertical.style.transform = `translateX(${x}px)`;
    horozontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px, ${
      y - targetHalfWidth
    }px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;
    tag.innerHTML = `${x}px, ${y}px`;
  });
});
