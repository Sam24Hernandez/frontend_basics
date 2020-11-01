const btn = document.querySelector("button");

function random(num) {
  return Math.floor(Math.random() * num);
}

function bgChange() {
  const rndCol =
    "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  document.body.style.backgroundColor = rndCol;
  console.log(rndCol);
  // e.target.style.backgroundColor = rndCol;
  // console.log(e);
}

btn.onclick = bgChange;
// btn.addEventListener("click", bgChange);
