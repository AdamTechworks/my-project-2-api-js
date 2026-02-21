// nav for all pages
export function loadNav(activePage = "") {
  const nav = document.getElementById("nav");
  if (!nav) return;

  nav.innerHTML = `
    <a href="/index.html" class="${activePage === "home" ? "active" : ""}">Home</a> |
    <a href="/catalog.html" class="${activePage === "catalog" ? "active" : ""}">Catalog</a> |
    <a href="/about.html" class="${activePage === "about" ? "active" : ""}">About</a>
    <hr />
  `;
}
