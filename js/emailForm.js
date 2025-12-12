const emailInput = document.getElementById('emailInput');
const subscribeBtn = document.getElementById('subscribeBtn');
const message = document.getElementById('message');

let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

subscribeBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();

  if (!email) {
    message.textContent = "Пожалуйста, введите email.";
    return;
  }

  if (!validateEmail(email)) {
    message.textContent = "Неверный формат email.";
    return;
  }

  if (subscribers.includes(email)) {
    message.textContent = "Этот email уже подписан.";
    return;
  }

  subscribers.push(email);
  localStorage.setItem('subscribers', JSON.stringify(subscribers));

  message.style.color = 'green';
  message.textContent = "Вы успешно подписаны!";

  emailInput.value = '';

  setTimeout(() => { message.textContent = ''; message.style.color = 'red'; }, 3000);
});
