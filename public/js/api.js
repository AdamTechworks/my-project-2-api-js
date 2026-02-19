const BASE_URL = "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${BASE_URL}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function getReviewsByProductId(productId) {
  const res = await fetch(`${BASE_URL}/reviews?productId=${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product reviews");
  return res.json();
}

export async function addReview(review) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review)
  });

  if (!res.ok) throw new Error("Failed to add review");
  return res.json();
}
