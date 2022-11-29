import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
var padStart = require('string.prototype.padstart');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startEl = document.querySelector('button[data-start]');
const dayEl = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minuteEl = document.querySelector('span[data-minutes]');
const secondEl = document.querySelector('span[data-seconds]');

let userDate = null;
const date = new Date();
let ms = 0;
let timerId = null;
let times = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      startEl.setAttribute('disabled', true);
    } else {
      userDate = selectedDates[0];
      startEl.removeAttribute('disabled');
    }
  },
};

const choiceDate = new flatpickr('input#datetime-picker', options);

startEl.addEventListener('click', getMilliseconds);

function getMilliseconds() {
  ms = userDate.getTime() - date.getTime();

  ms = startTime(ms);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) return (value = padStart(value, 2, '0'));
  return value;
}

function startTime(ms) {
  timerId = setInterval(() => {
    ms -= 1000;
    if (ms < 1000) clearInterval(timerId);

    times = convertMs(ms);

    for (let value in times) {
      const newValue = addLeadingZero(times[value]);
      times[value] = newValue;

      dayEl.textContent = times.days;
      hourEl.textContent = times.hours;
      minuteEl.textContent = times.minutes;
      secondEl.textContent = times.seconds;
    }
  }, 1000);
}
