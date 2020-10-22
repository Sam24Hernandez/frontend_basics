(function () {
  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  const myQuestions = [
    {
      question: "¿Quién inventó Javascript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
      },
      correctAnswer: "c",
    },
    {
      question: "¿Cuál de estos es un administrador de paquetes de JavaScript?",
      answers: {
        a: "Node.js",
        b: "Typescript",
        c: "npm",
      },
      correctAnswer: "c",
    },
    {
      question: "¿Cuál de estos es un testing para JavaScript?",
      answers: {
        a: "Node.js",
        b: "Jest",
        c: "npm",
      },
      correctAnswer: "b",
    },
    {
      question:
        "¿Qué herramienta puedes usar para asegurar la calidad del código?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "Jasmin",
        d: "EsLint",
      },
      correctAnswer: "d",
    },
    {
      question: "¿Cuál de estos es un Framework para JavaScript?",
      answers: {
        a: "Node.js",
        b: "Bootstrap",
        c: "Angular",
      },
      correctAnswer: "c",
    },
    {
      question: "¿Cuál de estos es un módulo de paquetes de JavaScript?",
      answers: {
        a: "React.js",
        b: "Typescript",
        c: "npm",
        d: "webpack",
      },
      correctAnswer: "d",
    },
  ];

  // Funciones
  function buildQuiz() {
    const output = [];

    // para cada pregunta...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      // y paraq cada pregunta disponible...
      for (letter in currentQuestion.answers) {
        // ...y un HTML radio button
        answers.push(
          `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
           ${letter} : ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // y esta pregunta y sus respuestas en el output
      output.push(
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finalmente combinar nuestra lista de salida en una cadena de HTML y ponerla en la página
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // recoger los contenedores de respuesta de nuestro quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // mantener un registro de las respuestas de los usuarios
    let numCorrect = 0;

    // para cada pregunta...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // encontrar la respuesta seleccionada
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // si la respuesta es correcta
      if (userAnswer === currentQuestion.correctAnswer) {
        // añadir al número de respuestas correctas
        numCorrect++;

        // color de la respuesta en verde
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // si la respuesta es incorrecta
        // color de la respuesta en rojo
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // mostrar el numero de la respuestas correctas
    resultsContainer.innerHTML = `${numCorrect} de ${myQuestions.length}`;
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
  }

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);

  // Escuchadores de eventos
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
