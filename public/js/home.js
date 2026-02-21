import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("home");

/* ---------- PRODUCT LIST (bottom of page) ---------- */

async function loadProducts() {
  const products = await getProducts();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = `/product.html?id=${product.id}`;
    link.textContent = `${product.name} - $${product.price}`;

    li.appendChild(link);
    list.appendChild(li);
  });
}

/* ---------- CAROUSEL ---------- */

function pickRandomUnique(products, count) {
  const copy = [...products];
  const picked = [];

  while (picked.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }
  return picked;
}

async function initCarousel() {
  const allProducts = await getProducts();

  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  // We grab 9 so arrows can rotate through sets of 3
  let picks = pickRandomUnique(allProducts, 9);
  let page = 0; // 0,1,2

  function render() {
    track.innerHTML = "";

    const start = page * 3;
    const visible = picks.slice(start, start + 3);

    visible.forEach(product => {
      const card = document.createElement("a");
      card.className = "carousel-card";
      card.href = `/product.html?id=${product.id}`;

      card.innerHTML = `
        <img class="carousel-img" src="${product.image}" alt="${product.name}">
        <div class="carousel-text">
          <h2>${product.name}</h2>
          <p class="carousel-desc">${product.description}</p>
        </div>
      `;

      track.appendChild(card);
    });
  }

  function next() {
    page = (page + 1) % 3;
    render();
  }

  function prev() {
    page = (page - 1 + 3) % 3;
    render();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // auto refresh every 15s (new random items)
  setInterval(() => {
    picks = pickRandomUnique(allProducts, 9);
    page = 0;
    render();
  }, 15000);

  render();
}

/* ---------- START PAGE ---------- */

loadProducts();
initCarousel();
