import { API } from "/node_modules/oba-wrapper/js/index.js";

const api = new API({
  key: "1e19898c87464e239192c8bfe422f280"
});
// console.log(api)
//Imagine the functions toJson, cleanJSON and
//renderToDocument exist, and do what their
//name says.
// (async () => {
//   const iterator = await api.createIterator(
//     "search/classification:prentenboek"
//   );
//   for await (const response of iterator) {
//     console.log(response);
//   }
// })();

const submit = document.querySelector(".button");

submit.addEventListener("click", getData);

function getData() {
  const value = document.querySelector(".veld").value;
  console.log(value);

  (async () => {
    const iterator = await api.createIterator(
      `search/${value}/*&facet=Type(book)`
    );
    for await (const response of iterator) {
      renderData(response);
    }
  })();
}

function renderData(response) {
  console.log(response);

  var app = document.getElementById("result");
  app.innerHTML = "";

  response.forEach(function(book) {
    var html = `
                <div class='card'>
                <h2>Resultaat:</h2>
                <p>${book.title.full}</p>
                <p>${book.author.fullname}</p>
                </div>`;
    app.insertAdjacentHTML("beforeend", html);
  });
}
