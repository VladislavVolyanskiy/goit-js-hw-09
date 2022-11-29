const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);
refs.stopBtn.disabled = true;

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStart() {
  onBtnSwitch();
  timerId = setInterval(renderBnd, 1000);
}

function onStop() {
  onBtnSwitch();
  clearInterval(timerId);
}

function renderBnd() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onBtnSwitch() {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopBtn.toggleAttribute('disabled');
}
