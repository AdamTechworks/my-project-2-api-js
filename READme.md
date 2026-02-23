<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project 02 - README</title>
</head>
<body>
  <h1>Project 02 — Multi-Page Product Website (API + json-server)</h1>

  <p><strong>Developer:</strong> Adam Ellison</p>

  <hr />

  <h2>Project Overview</h2>
  <p>
    <strong>Project 02</strong> is a multi-page product browsing website that connects to a local API using
    <strong>json-server</strong> and displays real data using <strong>JavaScript fetch()</strong>.
    Visitors can browse products, search, filter by category, view product details, and submit reviews.
  </p>
  <p>
    The goal of this project is to practice how real websites request data from an API, parse JSON responses,
    and dynamically update the DOM instead of hard-coding repeated content.
  </p>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>HTML</strong> – Structure and content of the website</li>
    <li><strong>CSS</strong> – Styling, layout, and responsiveness</li>
    <li><strong>JavaScript</strong> – DOM manipulation, fetch requests, async/await, page functionality</li>
    <li><strong>json-server</strong> – Local REST API powered by a <code>db.json</code> file</li>
    <li><strong>Git + GitHub</strong> – Version control and commit history</li>
  </ul>

  <h2>Wireframes</h2>
  <ul>
    <li>
      <strong>Images</strong><br />
      Product images displayed in the carousel, catalog cards, and product detail view.
    </li>
    <li>
      <strong>Links</strong><br />
      Product cards link to <code>product.html?id=##</code> and the navbar links between pages.
    </li>
    <li>
      <strong>Buttons</strong><br />
      Carousel previous/next buttons, review submit button, contact submit button.
    </li>
    <li>
      <strong>Navigation</strong><br />
      JavaScript-generated navbar displayed across all pages for smooth navigation.
    </li>
    <li>
      <strong>Form</strong><br />
      Review form on product page (POST) and contact form for purchase requests (POST).
    </li>
  </ul>

  <h2>How to Use the Site</h2>
  <ul>
    <li>
      <strong>Home Page</strong><br />
      Shows a rotating carousel of products (API-driven) and a clickable product list.
    </li>
    <li>
      <strong>Catalog</strong><br />
      Displays products from the API with a search bar and category dropdown filter.
    </li>
    <li>
      <strong>Product Details</strong><br />
      Shows a single product’s image, category, description, and reviews pulled from the API.
      Users can submit a new review.
    </li>
    <li>
      <strong>About</strong><br />
      Explains the purpose and customer experience of the store.
    </li>
    <li>
      <strong>Contact Page / Contact Form</strong><br />
      Allows users to send a message to request purchasing a product (since there is no cart).
      Product name can be prefilled from the URL.
    </li>
    <li>
      <strong>Navigation Bar</strong><br />
      JavaScript-generated nav appears on every page and highlights the active page.
    </li>
    <li>
      <strong>Reviews</strong><br />
      Shows customer review, rating, and comment about a purchased product.
    </li>    
  </ul>

  <h2>User Stories</h2>
  <ul>
    <li>
      <strong>As a user,</strong> I want to browse products on multiple pages so that I can find the products I am looking for.
    </li>
    <li>
      <strong>As a user,</strong> I want to search and filter products by category so that I can quickly find what I’m looking for.
    </li>
    <li>
      <strong>As a user,</strong> I want to view product details and reviews so that I can decide if I want to request that item.
    </li>
  </ul>

  <p>
    The site is responsive and designed to work on desktop and mobile screens using CSS layout rules.
    This project runs locally only and is not deployed.
  </p>

  <h2>Ideas for Future Improvements</h2>
  <ol>
    <li>
      Add stronger <strong>error handling</strong> and user-friendly messages (offline server, failed requests, empty results).
    </li>
    <li>
      Build a basic <strong>shopping cart</strong> experience (add/remove items, totals, localStorage persistence).
    </li>
    <li>
      Improve UX with <strong>animations</strong>, better loading states, and more advanced product sorting (price, category, rating).
    </li>
  </ol>

</body>
</html>