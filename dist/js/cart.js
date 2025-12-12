export let cart = [];

const btnCart = document.querySelector('#cart');
const modalPerf = document.querySelector('.modalPerf');
const modalOverlay = document.querySelector('.modal-overlay');
const body = document.body;
const boxPref = document.querySelector('.boxPref');
const orderBtn = document.querySelector('.order');

// --- Загрузка корзины из localStorage ---
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

// --- Открытие модалки ---
btnCart.addEventListener('click', () => {
  body.classList.add('modal-open');
  modalPerf.classList.add('active');
  modalOverlay.classList.add('active');
  renderCart();
});

// --- Закрытие модалки ---
function closeModal() {
  body.classList.remove('modal-open');
  modalPerf.classList.remove('active');
  modalOverlay.classList.remove('active');
}

modalOverlay.addEventListener('click', closeModal);
document.querySelector('.modalPerf .btnClose').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// --- Добавление товара ---
export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.count++;
  else cart.push({ ...product, count: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// --- Рендер корзины ---
export function renderCart() {
  boxPref.innerHTML = '';
  if (!cart.length) {
    boxPref.innerHTML = '<p>Корзина пуста</p>';
    return;
  }

  cart.forEach(item => {
    const prodPref = document.createElement('div');
    prodPref.classList.add('prodPref');

    const prodImg = document.createElement('div');
    prodImg.classList.add('prodImg');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    prodImg.appendChild(img);

    const prodText = document.createElement('div');
    prodText.classList.add('prodText');

    const leftText = document.createElement('div');
    leftText.classList.add('leftText');
    const h4 = document.createElement('h4');
    h4.textContent = item.name;
    const p1 = document.createElement('p');
    p1.textContent = `Количество: ${item.count}`;
    leftText.append(h4, p1);

    const rightText = document.createElement('div');
    rightText.classList.add('rightText');
    const p2 = document.createElement('p');
    p2.textContent = `${item.price * item.count} BYN`;
    rightText.appendChild(p2);

    prodText.append(leftText, rightText);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeItem');
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
      cart = cart.filter(p => p.id !== item.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    prodPref.append(prodImg, prodText, removeBtn);
    boxPref.appendChild(prodPref);
  });
}

// --- Кнопка Заказать ---
orderBtn.addEventListener('click', () => {
  if (!cart.length) {
    alert('Корзина пуста!');
    return;
  }
  alert('Заказ оформлен!');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});
