"use strict";

// Declaraciones de la fecha para mi cumpleaños
var year = new Date().getFullYear();
var thirdhOfJuly = new Date(year, 6, 3).getTime();
var thirdOfJulyNextYear = new Date(year + 1, 6, 3).getTime();
var month = new Date().getMonth(); // countdown

var timer = setInterval(function () {
  // obtener la fecha actual
  var today = new Date().getTime(); // obtener la diferencia de años

  var diff;

  if (month > 6) {
    diff = thirdOfJulyNextYear - today;
  } else {
    diff = fourthOfJuly - today;
  } // operaciones matemáticas


  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(diff % (1000 * 60) / 1000); // mostrar en el HTML

  document.getElementById("timer").innerHTML = '<div class="days"> \
  <div class="numbers">' + days + '</div>days</div> \
<div class="hours"> \
  <div class="numbers">' + hours + '</div>hours</div> \
<div class="minutes"> \
  <div class="numbers">' + minutes + '</div>minutes</div> \
<div class="seconds"> \
  <div class="numbers">' + seconds + "</div>seconds</div> \
</div>";
}, 1000);