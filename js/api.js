const DB_URL = "./db.json";

async function getDatabase() {
  const res = await fetch(DB_URL);

  if (!res.ok) {
    throw new Error("Failed to load local database");
  }

  return res.json();
}

export async function getProducts() {
  const data = await getDatabase();
  return data.products;
}


export async function getProductById(id) {
  const data = await getDatabase();

  return data.products.find(
    (product) => String(product.id) === String(id)
  );
}

export async function getReviews() {
    const data = await getDatabase();
  return data.reviews || [];
}

export async function getReviewsByProductId(productId) {
  const data = await getDatabase();

   return (data.reviews || []).filter(
    (review) => String(review.productId) === String(productId)
  );
}

export async function addReview(review) {
  console.log("Static demo only. Review not saved:", review);
  return review;
}

export async function addMessage(message) {
  console.log("Static demo only. Message not saved:", message);
  return message;
}