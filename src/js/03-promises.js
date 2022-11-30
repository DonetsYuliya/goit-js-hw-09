import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

let intervalId = null;
let position = 0;
const userInput = {};

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  userInput.delay = delayValue;
  userInput.step = stepValue;
  userInput.amount = amountValue;

  makePromise();
}
function makePromise() {
  setTimeout(() => {
    position += 1;
    delay = userInput.delay;
    createPromise(position, delay);
    if (userInput.amount === 1) return;
    intervalId = setInterval(() => {
      position += 1;
      delay += userInput.step;
      createPromise(position, delay);
      if (userInput.amount == position) clearInterval(intervalId);
    }, userInput.step);
  }, userInput.delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
