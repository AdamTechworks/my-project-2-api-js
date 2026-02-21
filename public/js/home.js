import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("home");

function showHomeError(message) {
  const statusEl = document.getElementById("homeStatus");
  if (statusEl) statusEl.textContent = message;
}

async function loadProducts() {
  const list = document.getElementById("productList");
  if (!list) return;

  const result = await getProducts();

  if (!result || !result.ok) {
    showHomeError("⚠️ Server is offline. Run: npm start");
    list.innerHTML = "";
    return;
  }

  const products = result.data;

  showHomeError("");
  list.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = `/product.html?id=${product.id}`;
    link.textContent = `${product.name} - $${product.price}`;

    li.appendChild(link);
    list.appendChild(li);
  });
}

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
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (!track || !prevBtn || !nextBtn) return;

  const result = await getProducts();

  if (!result || !result.ok) {
    showHomeError("⚠️ Carousel unavailable — server is offline. Run: npm start");
    track.innerHTML = "";
    return;
  }

  const allProducts = result.data;

  let picks = pickRandomUnique(allProducts, 9);
  let page = 0;

  function render() {
    track.innerHTML = "";

    const start = page * 3;
    const visible = picks.slice(start, start + 3);

    visible.forEach((product) => {
      const card = document.createElement("a");
      card.className = "carousel-card";
      card.href = `/product.html?id=${product.id}`;

      card.innerHTML = `
        <img class="carousel-img" src="${product.image}" alt="${product.name}">
        <div class="carousel-text">
          <h2>${product.name}</h2>
          <p class="carousel-desc">${product.description || ""}</p>
        </div>
      `;

      track.appendChild(card);
    });
  }

  prevBtn.addEventListener("click", () => {
    page = (page - 1 + 3) % 3;
    render();
  });

  nextBtn.addEventListener("click", () => {
    page = (page + 1) % 3;
    render();
  });

  render();
}

loadProducts();
initCarousel();