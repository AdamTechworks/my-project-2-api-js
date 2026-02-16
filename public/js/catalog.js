import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("catalog");

const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const status = document.getElementById("status");

let timer;

function renderProducts(products) {
  results.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - $${p.price}`;
    results.appendChild(li);
  });
}

async function loadAllProducts() {
  status.textContent = "Loading all products...";

  const data = await getProducts();

  status.textContent = `Showing ${data.length} product(s).`;
  renderProducts(data);
}

// async search: fetch then filter locally (case-insensitive)
async function searchProducts(query) {
  status.textContent = "Searching...";

  const data = await getProducts();
  const q = query.toLowerCase();

  const matches = data.filter(p => {
    const name = (p.name || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    const tags = Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase() : "";
    return name.includes(q) || category.includes(q) || tags.includes(q);
  });

  status.textContent = `Found ${matches.length} result(s) for "${query}".`;
  renderProducts(matches);
}

// Debounced input
input.addEventListener("input", () => {
  clearTimeout(timer);
  const q = input.value.trim();

  timer = setTimeout(() => {
    if (q === "") loadAllProducts();
    else searchProducts(q);
  }, 250);
});

// initial load
loadAllProducts();
