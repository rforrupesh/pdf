let posts = [];

fetch('/search.json')
  .then(response => response.json())
  .then(data => posts = data);

const input = document.getElementById("search-input");
const results = document.getElementById("search-results");

input.addEventListener("keyup", function () {
  let query = this.value.toLowerCase();
  results.innerHTML = "";

  if (query.length < 2) return;

  let filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query)
  );

  filtered.slice(0, 5).forEach(post => {
    let li = document.createElement("li");
    li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
    results.appendChild(li);
  });
});
