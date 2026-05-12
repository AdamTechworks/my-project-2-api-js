
console.log("✅ contact.js loaded");

import { loadNav } from "/js/nav.js";
import { addMessage } from "/js/api.js";

loadNav("contact");

const form = document.getElementById("contactForm");
const status = document.getElementById("contactStatus");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const product = document.getElementById("product");
const message = document.getElementById("message");

const params = new URLSearchParams(window.location.search);
const productFromUrl = params.get("product");
   if (productFromUrl) product.value = productFromUrl;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.textContent = "Sending...";

    const payload = {
        name: fullName.value.trim(),
        email: email.value.trim(),
        product: product.value.trim(),
        message: message.value.trim(),
        createdAt: new Date().toISOString()
    };

    try {
        await addMessage(payload);
        status.textContent = "Message sent!";
        form.reset();
    } catch (err) {
        console.error(err);
        status.textContent = `Failed to send message. is the server running? ${err.message}`;
    }
});