const BASE_URL = "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${BASE_URL}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
