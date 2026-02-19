import { loadNav } from "/js/nav.js";
import { getProducts } from "/js/api.js";

loadNav("home");

async function loadProducts() {
  const products = await getProducts();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");

    // clickable product link
    const a = document.createElement("a");
    a.href = `/product.html?id=${product.id}`;
    a.textContent = `${product.name} - $${product.price}`;
    a.style.textDecoration = "none";

    li.appendChild(a);
    list.appendChild(li);
  });
}

loadProducts();
