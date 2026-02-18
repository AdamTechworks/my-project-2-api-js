const BASE_URL = "http://localhost:3000";

// all products
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// all reviews (you already had this)
export async function getReviews() {
  const res = await fetch(`${BASE_URL}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// products filtered by search text (works with json-server full-text search)
export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/products?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

// one product by id
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

// reviews for one product (expects reviews to have productId)
export async function getReviewsByProductId(productId) {
  const res = await fetch(`${BASE_URL}/reviews?productId=${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product reviews");
  return res.json();
}

// new review
export async function addReview(review) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
}
