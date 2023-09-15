import MOVIE_API_KEY from "./apikey.js";

const formEl = document.querySelector(".movie-form");

formEl.addEventListener("submit", (ev) => {
  const query = document.getElementById("movie-name").value;
  getMovie(query);
  ev.preventDefault();
});

function getMovie(query) {
  fetch(`http://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&s=${query}&type=movie`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        alert(data.Error);
      } else {
        createCards(data.Search);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

function createCards(moviesArr) {
  const containerEl = document.querySelector(".container");
  containerEl.textContent = "";
  moviesArr.forEach((movie) => {
    const { Poster, Title } = movie;
    const articleEl = document.createElement("article");
    articleEl.classList.add("movie-card");
    const figureEl = document.createElement("figure");
    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", Poster);
    imageEl.setAttribute("alt", Title);
    imageEl.classList.add("movie-img");
    const figCap = document.createElement("figcaption");
    figCap.classList.add("movie-title");
    figCap.textContent = Title;
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("watch-btn");
    buttonEl.textContent = "Watch Now";
    figureEl.appendChild(imageEl);
    figureEl.appendChild(figCap);
    articleEl.appendChild(figureEl);
    articleEl.appendChild(buttonEl);
    containerEl.appendChild(articleEl);
  });
}
