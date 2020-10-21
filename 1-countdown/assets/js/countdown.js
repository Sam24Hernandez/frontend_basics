// Declaraciones de la fecha para mi cumpleaños
const year = new Date().getFullYear();
const thirdhOfJuly = new Date(year, 6, 3).getTime();
const thirdOfJulyNextYear = new Date(year + 1, 6, 3).getTime();
const month = new Date().getMonth();

// countdown
let timer = setInterval(function () {
  // obtener la fecha actual
  const today = new Date().getTime();

  // obtener la diferencia de años
  let diff;
  if (month > 6) {
    diff = thirdOfJulyNextYear - today;
  } else {
    diff = thirdhOfJuly - today;
  }

  // operaciones matemáticas
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // mostrar en el HTML
  document.getElementById("timer").innerHTML =
    '<div class="days"> \
  <div class="numbers">' +
    days +
    '</div>days</div> \
<div class="hours"> \
  <div class="numbers">' +
    hours +
    '</div>hours</div> \
<div class="minutes"> \
  <div class="numbers">' +
    minutes +
    '</div>minutes</div> \
<div class="seconds"> \
  <div class="numbers">' +
    seconds +
    "</div>seconds</div> \
</div>";
}, 1000);
