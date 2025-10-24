const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particulas = [];
for (let i = 0; i < 100; i++) {
  particulas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.5
  });
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fill();
    p.y -= p.speed;
    if (p.y < 0) p.y = canvas.height;
  });
  requestAnimationFrame(animar);
}

animar();
