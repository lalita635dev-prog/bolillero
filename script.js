const machine = document.getElementById("machine");
const ballsContainer = document.getElementById("balls");
const result = document.getElementById("result");
const historyDiv = document.getElementById("history");

let balls = [];
let drawn = [];

function initBalls() {
  ballsContainer.innerHTML = "";
  balls = [];
  drawn = [];
  historyDiv.innerHTML = "";
  result.innerHTML = "";

  const total = parseInt(document.getElementById("totalBalls").value);

  for (let i = 1; i <= total; i++) {
    balls.push(i);

    const ball = document.createElement("div");
    ball.className = "ball";
    ball.innerText = i;

    randomPosition(ball);
    ballsContainer.appendChild(ball);
  }
}

function randomPosition(el) {
  const x = Math.random() * (machine.clientWidth - 40);
  const y = Math.random() * (machine.clientHeight - 40);
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function shuffleAnimation() {
  const all = document.querySelectorAll(".ball");

  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      all.forEach(b => randomPosition(b));
    }, i * 50);
  }
}

function drawBalls() {
  const count = parseInt(document.getElementById("drawCount").value);

  let available = balls.filter(b => !drawn.includes(b));

  if (available.length === 0) {
    result.innerText = "No quedan bolillas";
    return;
  }

  shuffleAnimation();

  setTimeout(() => {
    let selected = [];

    for (let i = 0; i < count && available.length > 0; i++) {
      const index = Math.floor(Math.random() * available.length);
      const num = available.splice(index, 1)[0];
      drawn.push(num);
      selected.push(num);
    }

    result.innerText = selected.join(" - ");

    selected.forEach(n => {
      const span = document.createElement("span");
      span.innerText = n;
      historyDiv.appendChild(span);
    });

  }, 800);
}

// 🖱️ Drag hacia abajo
let startY = 0;

machine.addEventListener("mousedown", (e) => {
  startY = e.clientY;
});

machine.addEventListener("mouseup", (e) => {
  let diff = e.clientY - startY;

  if (diff > 100) {
    drawBalls();
  }
});

document.getElementById("resetBtn").onclick = initBalls;

// Init
initBalls();
