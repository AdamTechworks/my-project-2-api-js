export function loadNav(activePage) {
  const nav = document.createElement("nav");

  nav.innerHTML = `
    <a href="/index.html" ${activePage === "home" ? 'style="font-weight:bold;"' : ""}>Home</a> |
    <a href="/catalog.html" ${activePage === "catalog" ? 'style="font-weight:bold;"' : ""}>Catalog</a>
    <hr />
  `;

  document.body.insertBefore(nav, document.body.firstChild);
}
