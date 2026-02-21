const BASE_URL = "http://localhost:3000";

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      return { ok: false, status: res.status, data: null };
    }
    //a return that states an error during fetching
    const data = await res.json();
    return { ok: true, status: res.status, data };
  } catch (err) { //server offline
    return { ok: false, status: 0, data: null };
  }
}

export async function getProducts() {
  return await safeFetch(`${BASE_URL}/PRODUCTS`);
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
