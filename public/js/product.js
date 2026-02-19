import { getProductById, getReviewsByProductId, addReview } from "./api.js";
import { loadNav } from "./nav.js";

loadNav();

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const pageStatus = document.getElementById("pageStatus");
const productContainer = document.getElementById("productContainer");
const reviewList = document.getElementById("reviewList");
const reviewForm = document.getElementById("reviewForm");
const reviewStatus = document.getElementById("reviewStatus");

function renderProduct(p) {
  productContainer.innerHTML = `
    <div class="product-detail">
      <img class="product-image" src="${p.image}" alt="${p.name}" />
      <div>
        <h2>${p.name}</h2>
        <p><strong>Price:</strong> $${p.price}</p>
        <p><strong>Category:</strong> ${p.category}</p>
        <p>${p.description}</p>
      </div>
    </div>
  `;
}

function renderReviews(reviews) {
  reviewList.innerHTML = "";

  if (reviews.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No reviews yet. Be the first!";
    reviewList.appendChild(li);
    return;
  }

  reviews.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.name} (${r.rating}/5): ${r.comment}`;
    reviewList.appendChild(li);
  });
}

async function loadPage() {
  try {
    if (!productId) {
      pageStatus.textContent =
        "Missing product id in URL (example: product.html?id=7)";
      return;
    }

    pageStatus.textContent = "Loading product...";

    const product = await getProductById(productId);

    // ✅ Fix: update the browser tab title so it doesn't feel like the name is duplicated
    document.title = product.name;

    renderProduct(product);

    const reviews = await getReviewsByProductId(productId);
    renderReviews(reviews);

    pageStatus.textContent = "";
  } catch (err) {
    pageStatus.textContent = "Something went wrong loading this product.";
    console.error(err);
  }
}

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    reviewStatus.textContent = "Submitting...";

    const review = {
      productId: Number(productId),
      name: document.getElementById("reviewName").value.trim(),
      rating: Number(document.getElementById("reviewRating").value),
      comment: document.getElementById("reviewComment").value.trim(),
    };

    await addReview(review);

    reviewStatus.textContent = "Review added!";
    reviewForm.reset();

    const reviews = await getReviewsByProductId(productId);
    renderReviews(reviews);
  } catch (err) {
    reviewStatus.textContent = "Could not submit review. Try again.";
    console.error(err);
  }
});

loadPage();
