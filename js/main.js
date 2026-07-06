/* ==========================================================
   Jonatan Castellanos · Profesor de Idiomas — interacciones
   ========================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Nav: fondo al hacer scroll + barra de progreso ---------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Menú móvil ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    nav.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      nav.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Reveal al hacer scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Rotador de palabras del hero ---------- */
const rotator = document.getElementById('rotator');
if (rotator && !prefersReducedMotion) {
  const words = ['inglés', 'English', 'español', 'como local'];
  let i = 0;
  setInterval(() => {
    rotator.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % words.length;
      rotator.textContent = words[i];
      rotator.classList.remove('swap');
    }, 350);
  }, 3200);
}

/* ---------- Contadores animados ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const prefix = el.dataset.prefix ? el.dataset.prefix.replace('&lt;', '<') : '';
  const suffix = el.dataset.suffix || '';
  const dur = 1400;
  const start = performance.now();

  function frame(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('[data-counter]').forEach((el) => {
  if (prefersReducedMotion) {
    const prefix = el.dataset.prefix ? el.dataset.prefix.replace('&lt;', '<') : '';
    el.textContent = `${prefix}${el.dataset.counter}${el.dataset.suffix || ''}`;
  } else {
    counterObserver.observe(el);
  }
});

/* ---------- Chat animado del hero (loop) ---------- */
const chatBody = document.getElementById('chatBody');
if (chatBody && !prefersReducedMotion) {
  const msgs = [...chatBody.querySelectorAll('.msg')];
  const STEP_MS = 1500;
  const HOLD_MS = 3500;

  function playChat() {
    msgs.forEach((m) => m.classList.remove('shown'));
    msgs.forEach((m, idx) => {
      setTimeout(() => m.classList.add('shown'), 400 + idx * STEP_MS);
    });
    setTimeout(playChat, 400 + msgs.length * STEP_MS + HOLD_MS);
  }
  playChat();
} else if (chatBody) {
  chatBody.querySelectorAll('.msg').forEach((m) => m.classList.add('shown'));
}

/* ---------- Tabs de clases ---------- */
const tabs = document.querySelectorAll('.tab');
const glider = document.getElementById('tabGlider');

function moveGlider(tab) {
  if (!glider) return;
  glider.style.left = `${tab.offsetLeft}px`;
  glider.style.width = `${tab.offsetWidth}px`;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    moveGlider(tab);

    document.querySelectorAll('.tab-panel').forEach((p) => {
      const isActive = p.id === `panel-${tab.dataset.tab}`;
      p.classList.toggle('active', isActive);
      p.hidden = !isActive;
    });
  });
});

const activeTab = document.querySelector('.tab.active');
if (activeTab) {
  requestAnimationFrame(() => moveGlider(activeTab));
  window.addEventListener('resize', () => moveGlider(document.querySelector('.tab.active')));
}

/* ---------- Filtros de packs ---------- */
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product');

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((f) => f.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.dataset.filter;

    products.forEach((card) => {
      const cats = (card.dataset.cat || '').split(' ');
      const show = val === 'all' || cats.includes(val) || cats.includes('all-always');
      card.classList.toggle('hide', !show);
    });
  });
});

/* ---------- Glow que sigue el mouse en los productos ---------- */
if (matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
  document.querySelectorAll('.product.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- Slider de testimonios (solo móvil) ---------- */
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');

if (sliderTrack && sliderDots) {
  const slides = [...sliderTrack.children];
  let current = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
    dot.addEventListener('click', () => goTo(i, true));
    sliderDots.appendChild(dot);
  });

  const dots = [...sliderDots.children];

  function isMobile() { return window.matchMedia('(max-width: 720px)').matches; }

  function goTo(i, manual) {
    current = i;
    if (isMobile()) {
      sliderTrack.style.transform = `translateX(calc(-${i} * (100% + 1.6rem)))`;
    } else {
      sliderTrack.style.transform = '';
    }
    dots.forEach((d, di) => d.classList.toggle('active', di === i));
    if (manual) restart();
  }

  function next() { goTo((current + 1) % slides.length); }

  function restart() {
    clearInterval(timer);
    if (!prefersReducedMotion) timer = setInterval(() => { if (isMobile()) next(); }, 4500);
  }

  window.addEventListener('resize', () => goTo(isMobile() ? current : 0));
  goTo(0);
  restart();
}

/* ---------- FAQ: solo un item abierto a la vez ---------- */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach((o) => { if (o !== item) o.open = false; });
  });
});

/* ---------- Año del footer ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
