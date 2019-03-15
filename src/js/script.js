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

const submit = document.querySelector(".button");

submit.addEventListener("click", getData);

function getData() {
  const value = document.querySelector(".veld").value;
  console.log(value);

  (async () => {
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
                <img src="${book.images[1]}" alt="">
                </div>`;
    app.insertAdjacentHTML("beforeend", html);
  });

  selectCard()
}

function selectCard() {
  [...document.querySelectorAll('.card')].forEach(function (item) {
    item.addEventListener('click', function () {
      console.log(item.innerHTML);
      document.querySelector('.hidden').style.display = "inline-block";

      var app = document.querySelector(".hidden");
      app.innerHTML = item.innerHTML + `<p>Locatie: [hier komt een afbeelding van waar t boek ligt]</p> <button class="button">Haal 'm op!</button>`
    });
  });
}

var allQuestions = [{
  question: "Welk genre vindt je leuk?",
  choices: ["voetbal", "dieren", "spanning", "sprookjes"],
  correctAnswer: 0
}, {
  question: "Vervolg vraag?",
  choices: ["antwoord1", "antwoord2", "antwoord3", "antwoord4"],
  correctAnswer: 0
}, {
  question: "Vervolg vraag?",
  choices: ["antwoord1", "antwoord2", "antwoord3", "antwoord4"],
  correctAnswer: 0
}, {
  question: "Vervolg vraag?",
  choices: ["antwoord1", "antwoord2", "antwoord3", "antwoord4"],
  correctAnswer: 0
}];

function Quiz(options) {
  var elem = options.elem;
  var allQuestions = options.questions;
  var q_number = allQuestions.length;

  var answers = [];
  var questions = [];

  var correct_answers = 0;
  var current_number;

  generateQuestions(allQuestions);

  initQuiz();

  function generateQuestions(q) {
    for (var i = 0; i < q_number; i++) {
      var question = document.createElement('div');
      question.classList.add('question');
      question.id = 'question';

      var title = document.createElement('h2');
      title.textContent = q[i].question;

      question.appendChild(title);

      var list = document.createElement('ul');

      for (var j = 0, len = q[i].choices.length; j < len; j++) {
        var choice = document.createElement('li');

        var check = document.createElement('input');
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'question');

        var choice_text = document.createElement('label');
        choice_text.setAttribute('for', check.name);
        choice_text.textContent = q[i].choices[j];

        choice.appendChild(check);
        choice.appendChild(choice_text);

        list.appendChild(choice);
      }

      var prev_button = document.createElement('button');
      prev_button.textContent = 'Vorige vraag';
      prev_button.addEventListener('click', prevQuestion);

      var next_button = document.createElement('button');

      if (i === q_number - 1) {
        next_button.textContent = 'Klaar!';
        next_button.addEventListener('click', finishQuiz);
      } else {
        next_button.textContent = 'Volgende vraag';
        next_button.addEventListener('click', nextQuestion);
      }

      question.appendChild(list);

      if (i > 0) question.appendChild(prev_button);
      question.appendChild(next_button);

      questions.push(question);
    }
  }

  function render_question(number) {
    var warning = elem.getElementsByClassName('warning')[0];
    if (warning) {
      elem.removeChild(warning);
    }
    elem.appendChild(questions[number]);
    //$('#question').hide().fadeIn(500);
  }

  function initQuiz() {
    current_number = 0;
    render_question(current_number);
  }

  function checkAnswers() {
    for (var i = 0; i < q_number; i++) {
      if (answers[i] === allQuestions[i].correctAnswer) {
        correct_answers++;
      }
    }
  }

  function validateAnswer() {
    var list_items = elem.getElementsByTagName('input');
    var answered = false;
    for (var i = 0, len = list_items.length; i < len; i++) {
      if (list_items[i].checked) {
        answers.push(i);
        answered = true;
        break;
      }
    }
    if (!answered && !elem.getElementsByClassName('warning')[0]) {
      var warning = document.createElement('span');
      warning.textContent = "Beantwoord eerst de vraag pls.";
      warning.classList.add('warning');

      elem.appendChild(warning);
    }
    return answered;
  }

  function nextQuestion() {
    if (validateAnswer()) {
      elem.removeChild(questions[current_number]);
      current_number++;
      render_question(current_number);
    }
  }

  function prevQuestion() {
    elem.removeChild(questions[current_number]);
    answers.pop();
    current_number--;
    render_question(current_number);
  }

  function finishQuiz() {
    if (validateAnswer()) {
      checkAnswers();
      elem.removeChild(questions[current_number]);
      var result = document.createElement('p');
      if (correct_answers === 0) {
        result.textContent = "";
      } else {
        result.textContent = "Check hier onder je boek!";
      }
      elem.appendChild(result);
    }
  }
}

var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: allQuestions
});