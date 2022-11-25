function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyEl = document.querySelector('body');
const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');

let intervalId = null;

const toChangeColorBody = () => {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startEl.toggleAttribute('disabled');
};

const toStopColorChanged = () => {
  clearInterval(intervalId);
  startEl.toggleAttribute('disabled');
};

startEl.addEventListener('click', toChangeColorBody);
stopEl.addEventListener('click', toStopColorChanged);
