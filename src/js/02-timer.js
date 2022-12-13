import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

let currentTime = null;
let setTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      Notiflix.Report.warning('Please choose a date in the future', 'Close');
      return;
    }
    setTime = selectedDates[0].getTime();
    refs.startBtn.disabled = false;
    if (options.defaultDate.getTime() < setTime) {
    }
  },
};

refs.startBtn.addEventListener('click', onTimerRun);

const date = flatpickr('input#datetime-picker', options);

function onTimerRun() {
  Notiflix.Notify.success('The timer has been started');
  refs.startBtn.disabled = true;
  intervalId = setInterval(onClockHandle, 1000);
}

function onTimerStop(timeLeft) {
  if (timeLeft < 1000) {
    clearInterval(intervalId);
    Notiflix.Notify.warning('Time`s Up!');
  }
}

function onClockHandle() {
  currentTime = Date.now();
  const timeLeft = setTime - currentTime;
  onTimerStop(timeLeft);
  const formatTime = convertMs(timeLeft);
  onClockRender(formatTime);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onClockRender({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}
