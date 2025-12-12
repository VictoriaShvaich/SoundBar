import { addToCart } from './cart.js';

const headphoneTypes = [
  "Беспроводные","Проводные","Внутриканальные (вкладыши)","Накладные","Полноразмерные",
  "Игровые гарнитуры","Спортивные","С активным шумоподавлением (ANC)","Для студийной работы","Детские"
];

const headphoneBrands = [
  "Sony","Sennheiser","JBL","Apple","Bose","Audio-Technica","Beats",
  "HyperX","Logitech","Razer","Xiaomi","Samsung","Bang & Olufsen","AKG","Shure"
];

const sortOptions = [
  { value: 'price-asc', text: 'Цена: по возрастанию' },
  { value: 'price-desc', text: 'Цена: по убыванию' },
  { value: 'name-asc', text: 'Название: A → Z' },
  { value: 'name-desc', text: 'Название: Z → A' }
];

const headphones = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 2499,
    type: "С активным шумоподавлением (ANC)",
    image: "https://i.pinimg.com/736x/c3/46/a0/c346a0fc3dac610e9743316f0b2c3a50.jpg"
  },
  {
    id: 2,
    name: "JBL Tune 510BT",
    brand: "JBL",
    price: 499,
    type: "Беспроводные",
    image: "https://i.pinimg.com/736x/8a/8a/af/8a8aaf632aec23a4fb511e914b5723b9.jpg"
  },
  {
    id: 3,
    name: "Apple AirPods Pro 2",
    brand: "Apple",
    price: 2199,
    type: "Внутриканальные (вкладыши)",
    image: "https://i.pinimg.com/736x/f3/17/94/f31794f2a6bc4a7305528502bfcb9a9c.jpg"
  },
  {
    id: 4,
    name: "Sennheiser HD 600",
    brand: "Sennheiser",
    price: 3299,
    type: "Полноразмерные",
    image: "https://i.pinimg.com/736x/c4/57/a6/c457a6708b1e1f96aceac3dbc60e2596.jpg"
  },
  {
    id: 5,
    name: "HyperX Cloud II",
    brand: "HyperX",
    price: 899,
    type: "Игровые гарнитуры",
    image: "https://i.pinimg.com/736x/2e/a5/a7/2ea5a7a396e799d9a32c910a0ae05327.jpg"
  },
  {
    id: 6,
    name: "Razer BlackShark V2",
    brand: "Razer",
    price: 1099,
    type: "Игровые гарнитуры",
    image: "https://i.pinimg.com/1200x/c6/99/44/c69944ceab799afe9b9322ddea1bcf9b.jpg"
  },
  {
    id: 7,
    name: "Audio-Technica ATH-M50x",
    brand: "Audio-Technica",
    price: 1599,
    type: "Для студийной работы",
    image: "https://i.pinimg.com/1200x/e3/a8/ab/e3a8abfc28610f2a82e8ff63c478f94d.jpg"
  },
  {
    id: 8,
    name: "Beats Solo 3",
    brand: "Beats",
    price: 1799,
    type: "Накладные",
    image: "https://i.pinimg.com/736x/80/34/9d/80349dd70ddc5af2b8b32dd914e33fda.jpg"
  },
  {
    id: 9,
    name: "Xiaomi Redmi Buds 4 Pro",
    brand: "Xiaomi",
    price: 599,
    type: "Беспроводные",
    image: "https://i.pinimg.com/1200x/cb/d2/f6/cbd2f683561f39afafab9c4e440d7e39.jpg"
  },
  {
    id: 10,
    name: "Samsung Galaxy Buds 2",
    brand: "Samsung",
    price: 999,
    type: "С активным шумоподавлением (ANC)",
    image: "https://i.pinimg.com/736x/a8/8a/2b/a88a2b273a7377cc472c64d07d7012d4.jpg"
  },
  {
    id: 11,
    name: "AKG K240 Studio",
    brand: "AKG",
    price: 1299,
    type: "Для студийной работы",
    image: "https://i.pinimg.com/736x/4b/18/aa/4b18aa45820a8cc888160e68e9aaa86f.jpg"
  },
  {
    id: 12,
    name: "JBL JR310",
    brand: "JBL",
    price: 299,
    type: "Детские",
    image: "https://i.pinimg.com/474x/4b/45/2e/4b452ec3ebb232b9a3ec30a38f14096d.jpg"
  },
  {
    id: 13,
    name: "Bose QuietComfort 45",
    brand: "Bose",
    price: 2499,
    type: "С активным шумоподавлением (ANC)",
    image: "https://i.pinimg.com/1200x/56/25/99/56259969c09d55f52f83171dd0b6ff91.jpg"
  },
  {
    id: 14,
    name: "Shure SE215",
    brand: "Shure",
    price: 1199,
    type: "Внутриканальные (вкладыши)",
    image: "https://i.pinimg.com/736x/8c/73/f8/8c73f8afcf5fbb23b1a8f8a6fd4e2e9e.jpg"
  },
  {
    id: 15,
    name: "Sony WF-SP800N",
    brand: "Sony",
    price: 1399,
    type: "Спортивные",
    image: "https://i.pinimg.com/1200x/88/b7/3c/88b73c8e304f274cf3278d10361d71cd.jpg"
  }
];
const typeHeadPhone = document.getElementById('typeHeadPhone');
const brendHeadPhone = document.getElementById('brendHeadPhone');
const sortSelect = document.querySelector('.sort-select');
const searchInput = document.querySelector('.search');
const catalogeProd = document.querySelector('.catalogeProd');

let selectedTypes = new Set();
let selectedBrands = new Set();
let searchQuery = "";
let sortType = "";

// --- Фильтрация и сортировка ---
function filterProducts() {
  let list = headphones.filter(p => {
    if (selectedTypes.size && !selectedTypes.has(p.type)) return false;
    if (selectedBrands.size && !selectedBrands.has(p.brand)) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return false;
    return true;
  });
  list = sortProducts(list);
  renderProducts(list);
}

function sortProducts(list) {
  switch (sortType) {
    case "price-asc": return list.sort((a,b) => a.price - b.price);
    case "price-desc": return list.sort((a,b) => b.price - a.price);
    case "name-asc": return list.sort((a,b) => a.name.localeCompare(b.name));
    case "name-desc": return list.sort((a,b) => b.name.localeCompare(a.name));
  }
  return list;
}

// --- Создание карточки товара ---
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('boxProd');

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;

  const name = document.createElement('p');
  name.textContent = product.name;

  const priceBox = document.createElement('div');
  priceBox.classList.add('priceBox');

  const price = document.createElement('p');
  price.textContent = product.price + ' BYN';

  const buyBtn = document.createElement('button');
  buyBtn.textContent = 'В корзину';
  buyBtn.addEventListener('click', () => addToCart(product));

  priceBox.append(price, buyBtn);
  card.append(img, name, priceBox);
  catalogeProd.append(card);
}

// --- Рендер списка товаров ---
function renderProducts(list) {
  catalogeProd.innerHTML = "";
  if (!list.length) {
    catalogeProd.innerHTML = "<p class='empty'>Ничего не найдено...</p>";
    return;
  }
  list.forEach(createProductCard);
}

// --- Чекбоксы ---
function createCheckBox(arr, place, type) {
  arr.forEach(value => {
    const label = document.createElement('label');
    label.classList.add("label");
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;
    checkbox.addEventListener('change', () => {
      if (type === "type") checkbox.checked ? selectedTypes.add(value) : selectedTypes.delete(value);
      else checkbox.checked ? selectedBrands.add(value) : selectedBrands.delete(value);
      filterProducts();
    });
    const span = document.createElement('span');
    span.textContent = value;
    label.append(checkbox, span);
    place.append(label);
  });
}

// --- Инициализация ---
createCheckBox(headphoneTypes, typeHeadPhone, "type");
createCheckBox(headphoneBrands, brendHeadPhone, "brand");

sortOptions.forEach(opt => {
  const option = document.createElement('option');
  option.value = opt.value;
  option.textContent = opt.text;
  sortSelect.append(option);
});

sortSelect.addEventListener('change', () => { sortType = sortSelect.value; filterProducts(); });
searchInput.addEventListener('input', () => { searchQuery = searchInput.value.toLowerCase().trim(); filterProducts(); });

renderProducts(headphones);
