import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("home");

async function loadProducts() {
  const products = await getProducts();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    list.appendChild(li);
  });
}

loadProducts();
