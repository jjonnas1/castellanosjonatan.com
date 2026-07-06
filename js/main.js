// Menú móvil
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  nav.classList.toggle('menu-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

// Cerrar el menú al elegir un enlace
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    nav.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Animación de aparición al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();
