const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const body = document.body;

let mouse = { x: 0, y: 0 };
let ringPos = { x: 0, y: 0 };
const ease = 0.07; // délai doux du ring

// Détecte le mouvement pour faire apparaître le ring
let timeout;
function showRing() {
  body.classList.add('moving');
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    body.classList.remove('moving');
  }, 1200); // disparaît après ~1.2s d'inactivité
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  showRing();

  dot.style.left = mouse.x + 'px';
  dot.style.top  = mouse.y + 'px';
});

// Lerp pour le ring (suivi fluide)
function animate() {
  ringPos.x += (mouse.x - ringPos.x) * ease;
  ringPos.y += (mouse.y - ringPos.y) * ease;

  ring.style.left = ringPos.x + 'px';
  ring.style.top  = ringPos.y + 'px';

  requestAnimationFrame(animate);
}
animate();

// Gestion du hover
document.querySelectorAll('a, button, .link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    body.classList.add('hover');
    showRing();
  });
  
  el.addEventListener('mouseleave', () => {
    body.classList.remove('hover');
  });
});
