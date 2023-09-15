const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal-btn");
const closeModal = document.querySelector(".close-modal-btn");
const formEL = document.querySelector("form");
const articles = [];

formEL.addEventListener("submit", () => {
  const postUrlEl = document.getElementById("post-url");
  const postTitleEl = document.getElementById("post-title");
  const postDescEl = document.getElementById("post-description");
  const postContentEl = document.getElementById("post-content");

  const containerEl = document.querySelector(".container");
  const articleEl = createArticleEl(
    postUrlEl.value,
    postTitleEl.value,
    postDescEl.value,
    postContentEl.value
  );

  containerEl.appendChild(articleEl);
});

function createArticleEl(url, title, summary, desc) {
  const articleData = {
    url: url,
    title: title,
    summary: summary,
    desc: desc,
  };
  const articleEl = document.createElement("article");
  articleEl.setAttribute(
    "class",
    "border-2 rounded-md border-gray-400 p-5 flex flex-col gap-4 h-fit blog"
  );
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "image-ctn");
  const imageEl = `
            <img
              src="${url}"
              alt="blog cover image"
              title="blog image"
              width="250"
              height="300"
              class="blog-img rounded-2xl w-full h-full"
              />
  `;
  divEl.innerHTML = imageEl;
  const headingEl = document.createElement("h2");
  headingEl.textContent = title;
  headingEl.setAttribute("class", "text-xl font-bold blog-title");
  const paraEl = document.createElement("p");
  paraEl.textContent = summary;
  paraEl.setAttribute("class", "blog-summary");
  const anotherParaEl = document.createElement("p");
  anotherParaEl.textContent = desc;
  anotherParaEl.classList.add("hidden");
  anotherParaEl.classList.add("blog-description");
  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("class", "readBtn bg-red-200 p-2 text-red-500");
  buttonEl.textContent = "Read";
  buttonEl.addEventListener("click", openBlogPage);

  articleEl.appendChild(divEl);
  articleEl.appendChild(headingEl);
  articleEl.appendChild(paraEl);
  articleEl.appendChild(anotherParaEl);
  articleEl.appendChild(buttonEl);
  articles.push(articleData);
  return articleEl;
}

const blogData = {};
function openBlogPage(ev) {
  // blog-image, blog-title, blog-summary, blog-description
  const article = ev.target.parentElement;
  const blogImgUrl = article.querySelector("img").src;
  const blogTitle = article.querySelector(".blog-title").textContent;
  const blogSummary = article.querySelector(".blog-summary").textContent;
  const blogDescription =
    article.querySelector(".blog-description").textContent;

  blogData.imageUrl = blogImgUrl;
  blogData.title = blogTitle;
  blogData.summary = blogSummary;
  blogData.description = blogDescription;
  const queryParams = new URLSearchParams(blogData);
  const readBlogUrl = `/mern-stack/milestone-projects/pwskills-blog/dist/blog.html?${queryParams.toString()}`;
  console.log(articles);
  console.log(JSON.stringify(articles));
  sessionStorage.setItem("articles-data", JSON.stringify(articles));
  // Redirect to the "Read Blog" page
  window.location.href = readBlogUrl;
}

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

function renderArticlesEl() {
  if (sessionStorage.getItem("articles-data")) {
    const articles = sessionStorage.getItem("articles-data");
    const data = JSON.parse(articles);
    console.log(data);
    const containerEl = document.querySelector(".container");
    data.forEach((element) => {
      const article = createArticleEl(
        element.url,
        element.title,
        element.summary,
        element.desc
      );
      containerEl.appendChild(article);
    });
  }
}

renderArticlesEl();
