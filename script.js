let isSpinning = false;
let velocity = 0;
let ballsPhysics = [];

function initPhysics() {
  const total = parseInt(totalBalls.value);

  ballsPhysics = [];

  for (let i = 1; i <= total; i++) {
    ballsPhysics.push({
      id: i,
      x: Math.random() * 200,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5
    });
  }
}

function updatePhysics() {
  ballsPhysics.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    // rebote simple
    if (b.x < 0 || b.x > 260) b.vx *= -1;
    if (b.y < 0 || b.y > 200) b.vy *= -1;

    // fricción
    b.vx *= 0.98;
    b.vy *= 0.98;
  });
}

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

function loop() {
  if (isSpinning) {
    updatePhysics();
    renderBalls();
  }

  requestAnimationFrame(loop);
}

loop();

function extractBall() {
  const available = ballsPhysics.filter(b => !drawn.includes(b.id));

  if (!available.length) return;

  const selected = available[Math.floor(Math.random() * available.length)];

  drawn.push(selected.id);

  // animación salida
  const el = [...document.querySelectorAll(".ball")]
    .find(e => e.innerText == selected.id);

  el.style.transition = "all 0.6s ease";
  el.style.transform = "translate(120px, -80px) scale(1.5)";

  result.innerText = selected.id;
}

machine.addEventListener("mousedown", () => {
  isSpinning = true;
  velocity = 5;
});

machine.addEventListener("mouseup", () => {
  isSpinning = false;

  setTimeout(() => {
    extractBall();
  }, 500);
});