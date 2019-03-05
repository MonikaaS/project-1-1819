import { API } from "/node_modules/oba-wrapper/js/index.js";

const api = new API({
  key: "1e19898c87464e239192c8bfe422f280"
});
// console.log(api)
//Imagine the functions toJson, cleanJSON and
//renderToDocument exist, and do what their
//name says.
(async () => {
  const iterator = await api.createIterator(
    "search/classification:prentenboek"
  );
  for await (const response of iterator) {
    console.log(response);
  }
})();

const submit = document.querySelector(".button");

submit.addEventListener("click", getValue);

function getValue() {
  const value = document.querySelector(".veld").value;
  console.log(value);
}
