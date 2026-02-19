import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("home");

async function loadProductsList(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = `/product.html?id=${product.id}`;
    a.textContent = `${product.name} - $${product.price}`;
    a.style.textDecoration = "none";

    li.appendChild(a);
    list.appendChild(li);
  });
}

// Carousel 
function pickRandomUnique(products, count) {
  const copy = [...products];
  const picked = [];

  while (picked.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }

  return picked;
}

function initCarousel(allProducts) {
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const img = document.getElementById("carouselImg");
  const name = document.getElementById("carouselName");
  const price = document.getElementById("carouselPrice");
  const link = document.getElementById("carouselLink");
  const status = document.getElementById("carouselStatus");

  if (!prevBtn || !nextBtn || !img || !name || !price || !link) return;

  let picks = pickRandomUnique(allProducts, 3);
  let i = 0;

  function render() {
    if (picks.length === 0) return;

    const p = picks[i];
    img.src = p.image;
    img.alt = p.name;
    name.textContent = p.name;
    price.textContent = `$${p.price}`;
    link.href = `/product.html?id=${p.id}`;

    if (status) status.textContent = `Featured ${i + 1} of ${picks.length}`;
  }

  function prev() {
    i = (i - 1 + picks.length) % picks.length;
    render();
  }

  function next() {
    i = (i + 1) % picks.length;
    render();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // refresh the 3 picks periodically
  setInterval(() => {
    picks = pickRandomUnique(allProducts, 3);
    i = 0;
    render();
  }, 15000);

  render();
}
// End of Carousel 

async function initHome() {
  const pageStatus = document.getElementById("homeStatus");

  try {
    if (pageStatus) pageStatus.textContent = "Loading products...";

    const products = await getProducts();

    if (pageStatus) pageStatus.textContent = "";
    await loadProductsList(products);
    initCarousel(products);
  } catch (err) {
    console.error(err);
    if (pageStatus) {
      pageStatus.textContent = "⚠️ Could not load products. Is the server running (npm start)?";
    }
  }
}

initHome();
