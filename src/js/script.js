import {
  API
} from "/node_modules/oba-wrapper/js/index.js";

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

console.log('hallo')

const submit = document.querySelector(".button");

submit.addEventListener("click", getData);

function loader() {
  var app = document.getElementById("result");

  app.innerHTML = ''

  console.log('loading')
  var html = `
            <div class='spinner'>
            <div class='rect1'></div>
            <div class='rect2'></div>
            <div class='rect3'></div>
            <div class='rect4'></div>
            <div class='rect5'></div>
          </div>`
  app.insertAdjacentHTML('beforeend', html)

}

function getData() {
  const value = document.querySelector(".veld").value;
  console.log(value);

  (async () => {
    loader()
    const iterator = await api.createIterator(
      `search/${value}&facet=Type(book)`
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

  response.forEach(function (book) {
    var html = `
                <div class='card'>
                <p>Titel: ${book.title.full}</p>
                <p>Auteur: ${book.author.fullname}</p>
                <img id ="img"src="${book.images[1]}" alt="">
                </div>`;
    app.insertAdjacentHTML("beforeend", html);
  });

  selectCard()
}

function selectCard() {
  [...document.querySelectorAll('.card')].forEach(function (item) {
    item.addEventListener('click', function () {

      this.classList.toggle('active')
      // console.log(item.innerHTML);
      document.querySelector('.hidden').style.display = "inline-block";

      var app = document.querySelector(".hidden");
      app.innerHTML = item.innerHTML + ` <h2 class="white">Locatie:</h2><img id="robot" src="afbeeldingen/Screenshot 2019-05-15 at 13.39.14.png" alt="robot"> <button class="button">reserveer 'm!</button>`
    });
  });
}