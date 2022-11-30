import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

let position = 0;

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 0; i <= amountValue; i += 1) {
    position = i;
    if (i === 1) {
      delay = delayValue;
    } else {
      delay = delayValue + stepValue;
    }
    return { position, delay };
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
