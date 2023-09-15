document.addEventListener("DOMContentLoaded", createNewPage);

function createNewPage() {
  // On the "Read Blog" page
  const queryParams = new URLSearchParams(window.location.search);
  const imageUrl = queryParams.get("imageUrl");
  const title = queryParams.get("title");
  const summary = queryParams.get("summary");
  const description = queryParams.get("description");

  const article = document.querySelector(".read-blog");
  article.querySelector("img").src = imageUrl;
  article.querySelector(".blog-title").textContent = title;
  article.querySelector(".blog-summary").textContent = summary;
  article.querySelector(".blog-description").textContent = description;
}
