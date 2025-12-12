const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const reviewInput = document.getElementById('reviewInput');
const submitBtn = document.getElementById('submitReviewBtn');
const reviewMessage = document.getElementById('reviewMessage');
const reviewsContainer = document.getElementById('reviewsContainer');

let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const reviewText = reviewInput.value.trim();

  if (!name) {
    reviewMessage.textContent = "Введите ваше имя.";
    return;
  }

  if (!email) {
    reviewMessage.textContent = "Введите email.";
    return;
  }

  if (!validateEmail(email)) {
    reviewMessage.textContent = "Неверный формат email.";
    return;
  }

  if (!reviewText) {
    reviewMessage.textContent = "Напишите отзыв.";
    return;
  }


  const review = {
    name,
    email,
    review: reviewText,
    date: new Date().toLocaleString()
  };


  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));


  reviewMessage.style.color = 'green';
  reviewMessage.textContent = "Отзыв успешно отправлен!";


  nameInput.value = '';
  emailInput.value = '';
  reviewInput.value = '';

  setTimeout(() => { 
    reviewMessage.textContent = ''; 
    reviewMessage.style.color = 'red'; 
  }, 3000);
});
