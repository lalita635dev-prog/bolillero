const machine = document.getElementById("machine");
const ballsContainer = document.getElementById("balls");
const result = document.getElementById("result");
const totalBalls = document.getElementById("totalBalls");
const resetBtn = document.getElementById("resetBtn");

let isSpinning = false;
let ballsPhysics = [];
let drawn = [];

// 🎱 INIT
function initPhysics() {
  const total = parseInt(totalBalls.value);

  ballsPhysics = [];
  drawn = [];
  result.innerText = "";

  for (let i = 1; i <= total; i++) {
    ballsPhysics.push({
      id: i,
      x: Math.random() * 260,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6
    });
  }

  renderBalls();
}

// ⚙️ FÍSICA
function updatePhysics() {
  ballsPhysics.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    // rebote contra paredes
    if (b.x < 0 || b.x > 260) b.vx *= -1;
    if (b.y < 0 || b.y > 200) b.vy *= -1;

    // fricción
    b.vx *= 0.98;
    b.vy *= 0.98;
  });
}

// 🎨 RENDER
function renderBalls() {
  ballsContainer.innerHTML = "";

  ballsPhysics.forEach(b => {
    const el = document.createElement("div");
    el.className = "ball";
    el.innerText = b.id;
    el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    ballsContainer.appendChild(el);
  });
}

// 🔄 LOOP
function loop() {
  if (isSpinning) {
    updatePhysics();
    renderBalls();
  }

  requestAnimationFrame(loop);
}

loop();

// 🎯 EXTRAER BOLILLA
function extractBall() {
  const available = ballsPhysics.filter(b => !drawn.includes(b.id));

  if (!available.length) {
    result.innerText = "No quedan bolillas";
    return;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  drawn.push(selected.id);

  const el = [...document.querySelectorAll(".ball")]
    .find(e => e.innerText == selected.id);

  if (!el) return;

  el.style.transition = "all 0.6s ease";
  el.style.transform = "translate(120px, -80px) scale(1.6) rotate(15deg)";

  result.innerText = selected.id;
}

// 🖱️ INTERACCIÓN
machine.addEventListener("mousedown", () => {
  isSpinning = true;
});

machine.addEventListener("mouseup", () => {
  isSpinning = false;

  setTimeout(() => {
    extractBall();
  }, 600);
});

// 🔁 RESET
resetBtn.addEventListener("click", initPhysics);

// 🚀 INIT
initPhysics();