"use strict";

(function () {
  // Variables
  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");
  var myQuestions = [{
    question: "¿Quién inventó Javascript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  }, {
    question: "¿Cuál de estos es un administrador de paquetes de JavaScript?",
    answers: {
      a: "Node.js",
      b: "Typescript",
      c: "npm"
    },
    correctAnswer: "c"
  }, {
    question: "¿Cuál de estos es un testing para JavaScript?",
    answers: {
      a: "Node.js",
      b: "Jest",
      c: "npm"
    },
    correctAnswer: "b"
  }, {
    question: "¿Qué herramienta puedes usar para asegurar la calidad del código?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "Jasmin",
      d: "EsLint"
    },
    correctAnswer: "d"
  }, {
    question: "¿Cuál de estos es un Framework para JavaScript?",
    answers: {
      a: "Node.js",
      b: "Bootstrap",
      c: "Angular"
    },
    correctAnswer: "c"
  }, {
    question: "¿Cuál de estos es un módulo de paquetes de JavaScript?",
    answers: {
      a: "React.js",
      b: "Typescript",
      c: "npm",
      d: "webpack"
    },
    correctAnswer: "d"
  }]; // Funciones

  function buildQuiz() {
    var output = []; // para cada pregunta...

    myQuestions.forEach(function (currentQuestion, questionNumber) {
      var answers = []; // y paraq cada pregunta disponible...

      for (letter in currentQuestion.answers) {
        // ...y un HTML radio button
        answers.push("<label>\n           <input type=\"radio\" name=\"question".concat(questionNumber, "\" value=\"").concat(letter, "\">\n           ").concat(letter, " : ").concat(currentQuestion.answers[letter], "\n           </label>"));
      } // y esta pregunta y sus respuestas en el output


      output.push("<div class=\"slide\">\n            <div class=\"question\"> ".concat(currentQuestion.question, " </div>\n            <div class=\"answers\"> ").concat(answers.join(""), " </div>\n         </div>"));
    }); // finalmente combinar nuestra lista de salida en una cadena de HTML y ponerla en la página

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // recoger los contenedores de respuesta de nuestro quiz
    var answerContainers = quizContainer.querySelectorAll(".answers"); // mantener un registro de las respuestas de los usuarios

    var numCorrect = 0; // para cada pregunta...

    myQuestions.forEach(function (currentQuestion, questionNumber) {
      // encontrar la respuesta seleccionada
      var answerContainer = answerContainers[questionNumber];
      var selector = "input[name=question".concat(questionNumber, "]:checked");
      var userAnswer = (answerContainer.querySelector(selector) || {}).value; // si la respuesta es correcta

      if (userAnswer === currentQuestion.correctAnswer) {
        // añadir al número de respuestas correctas
        numCorrect++; // color de la respuesta en verde

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // si la respuesta es incorrecta
        // color de la respuesta en rojo
        answerContainers[questionNumber].style.color = "red";
      }
    }); // mostrar el numero de la respuestas correctas

    resultsContainer.innerHTML = "".concat(numCorrect, " de ").concat(myQuestions.length);
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  } // Kick things off


  buildQuiz(); // Pagination

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  var currentSlide = 0;
  showSlide(currentSlide); // Escuchadores de eventos

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();