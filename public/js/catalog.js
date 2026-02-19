import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("catalog");

const input = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const results = document.getElementById("results");
const status = document.getElementById("status");

let timer;
let allProducts = [];

function renderProducts(products) {
  results.innerHTML = "";

  if (products.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No matching products.";
    results.appendChild(li);
    return;
  }

  products.forEach((p) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = `/product.html?id=${p.id}`;
    a.textContent = `${p.name} - $${p.price}`;
    a.style.textDecoration = "none";

    li.appendChild(a);
    results.appendChild(li);
  });
}

function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();

  // reset dropdown to All + categories
  categoryFilter.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

function applyFilters() {
  const q = input.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const matches = allProducts.filter((p) => {
    const name = (p.name || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    const tags = Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase() : "";

    const matchesText =
      q === "" || name.includes(q) || category.includes(q) || tags.includes(q);

    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    return matchesText && matchesCategory;
  });

  const label = q ? ` for "${input.value.trim()}"` : "";
  status.textContent = `Showing ${matches.length} product(s)${label}.`;

  renderProducts(matches);
}

async function initCatalog() {
  try {
    status.textContent = "Loading products...";

    allProducts = await getProducts();

    populateCategories(allProducts);
    applyFilters();
  } catch (err) {
    console.error(err);
    status.textContent = "⚠️ Could not load products. Is the server running (npm start)?";
    results.innerHTML = "";
  }
}

// Debounced input (prevents spam)
input.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(applyFilters, 250);
});

// Category change updates instantly
categoryFilter.addEventListener("change", applyFilters);

initCatalog();
