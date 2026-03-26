// Ano automático no footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Menu mobile
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const header = document.querySelector('[data-header]');
const navLinks = document.querySelectorAll('[data-nav-link]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      nav.classList.remove('is-open');
    });
  });
}

// Header ao rolar
function handleHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
handleHeaderScroll();
window.addEventListener('scroll', handleHeaderScroll);

// Scroll suave manual (para caso o browser não suporte nativamente)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});

// Botão voltar ao topo
const scrollTopBtn = document.querySelector('[data-scroll-top]');

function handleScrollTopVisibility() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('is-visible');
  } else {
    scrollTopBtn.classList.remove('is-visible');
  }
}
handleScrollTopVisibility();
window.addEventListener('scroll', handleScrollTopVisibility);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Destacar links do menu conforme a seção visível
const sections = document.querySelectorAll('[data-section]');
const navLinkMap = {};
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    navLinkMap[href.substring(1)] = link;
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;

      const navLink = navLinkMap[id];
      if (!navLink) return;

      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        navLink.classList.add('is-active');
      }
    });
  },
  {
    root: null,
    threshold: 0.45
  }
);

sections.forEach(sec => observer.observe(sec));

// Animação de entrada das seções (fade + slide)
const animatedBlocks = document.querySelectorAll('[data-animate]');

const animateObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        animateObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.25
  }
);

animatedBlocks.forEach(block => animateObserver.observe(block));

// Botões do CTA (aqui você pluga links de verdade)
const btnInscricao = document.getElementById('btnInscricao');
const btnConsultor = document.getElementById('btnConsultor');

// Exemplo: abrir WhatsApp com mensagem pronta
if (btnConsultor) {
  btnConsultor.addEventListener('click', e => {
    e.preventDefault();
    // Substitua pelo seu número no formato 55DDDNUMERO
    const phone = '5599999999999';
    const text = encodeURIComponent(
      'Olá! Tenho interesse no Curso de Robótica e gostaria de falar com um consultor.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".stack-slide"));
  const prevBtn = document.querySelector(".carousel-nav.prev");
  const nextBtn = document.querySelector(".carousel-nav.next");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function updateSlides() {
    slides.forEach(slide => {
      slide.classList.remove("is-active", "is-prev", "is-next");
    });

    const prev = (current - 1 + slides.length) % slides.length;
    const next = (current + 1) % slides.length;

    slides[current].classList.add("is-active");
    slides[prev].classList.add("is-prev");
    slides[next].classList.add("is-next");
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlides();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlides();
  });

  updateSlides();
});
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".stack-carousel");
  const slides = carousel?.querySelectorAll(".stack-slide");
  if (!carousel || slides.length < 2) return;

  let current = 0;
  let startX = 0;
  let deltaX = 0;
  let dragging = false;

  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.classList.remove("is-active", "is-next", "is-prev", "hint");

      if (i === current) slide.classList.add("is-active");
      if (i === (current + 1) % slides.length) slide.classList.add("is-next");
      if (i === (current - 1 + slides.length) % slides.length) slide.classList.add("is-prev");
    });
  }

  updateSlides();

  /* HINT: só na imagem ativa */
  if (window.innerWidth <= 768) {
    const active = carousel.querySelector(".is-active");
    if (active) {
      active.classList.add("hint");
      setTimeout(() => active.classList.remove("hint"), 4500);
    }
  }

  /* TOUCH */
  carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    deltaX = 0;
    dragging = true;

    const active = carousel.querySelector(".is-active");
    if (active) active.classList.remove("hint");
  });

  carousel.addEventListener("touchmove", e => {
    if (!dragging) return;
    deltaX = e.touches[0].clientX - startX;

    const active = carousel.querySelector(".is-active");
    if (active) {
      active.style.transform = `translateX(${deltaX}px) scale(1)`;
    }
  });

  carousel.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;

    const active = carousel.querySelector(".is-active");
    if (active) {
      active.style.transition = "transform 300ms ease";
      active.style.transform = "";
      setTimeout(() => active.style.transition = "", 300);
    }

    if (deltaX > 60) {
      current = (current - 1 + slides.length) % slides.length;
    } else if (deltaX < -60) {
      current = (current + 1) % slides.length;
    }

    updateSlides();
  });
});

// =========================
// STACKED CARDS CAROUSEL (AUTO-PLAY LENTO)
// =========================
(function initCardsCarousel(){
  document.addEventListener('visibilitychange', () => {
  if (document.hidden) stop();
  else start();
});

  const carousel = document.querySelector('[data-cards-carousel]');
  if(!carousel) return;
// ✅ deixa os botões visíveis por mais tempo (ms)
const NAV_LINGER_MS = 1200; // 1.2s (aumente se quiser)

let navTimer = null;

function showNav(){
  if (navTimer) clearTimeout(navTimer);
  carousel.classList.add('nav-visible');
}

function hideNavLater(){
  if (navTimer) clearTimeout(navTimer);
  navTimer = setTimeout(() => {
    carousel.classList.remove('nav-visible');
  }, NAV_LINGER_MS);
}

// Mostra ao entrar / segura visível
carousel.addEventListener('mouseenter', showNav);
carousel.addEventListener('mousemove', showNav);

// Some depois de um tempinho ao sair
carousel.addEventListener('mouseleave', hideNavLater);

// Também mantém se passar por cima dos botões
const navs = carousel.querySelectorAll('.cards-nav');
navs.forEach(btn => {
  btn.addEventListener('mouseenter', showNav);
  btn.addEventListener('mouseleave', hideNavLater);
});

// Inicia visível por alguns segundos (opcional)
showNav();
hideNavLater();

  const slides = Array.from(carousel.querySelectorAll('.cards-slide'));
  const btnPrev = carousel.querySelector('[data-cards-prev]');
  const btnNext = carousel.querySelector('[data-cards-next]');
  if(slides.length === 0) return;

  let index = 0;
  let timer = null;

  const INTERVAL_MS = 6500; // ✅ bem lento (6.5s) — aumente se quiser

  function mod(n, m){ return ((n % m) + m) % m; }

  function render(){
    slides.forEach(s => s.classList.remove('is-active','is-2','is-3'));

    const a = mod(index, slides.length);
    const b = mod(index + 1, slides.length);
    const c = mod(index + 2, slides.length);

    slides[a].classList.add('is-active');
    if(slides.length > 1) slides[b].classList.add('is-2');
    if(slides.length > 2) slides[c].classList.add('is-3');
  }

  function next(){ index = mod(index + 1, slides.length); render(); }
  function prev(){ index = mod(index - 1, slides.length); render(); }

  function start(){
    stop();
    if(slides.length <= 1) return;
    timer = setInterval(next, INTERVAL_MS);
  }

  function stop(){
    if(timer) clearInterval(timer);
    timer = null;
  }

  // Botões
  btnNext && btnNext.addEventListener('click', () => { next(); start(); });
  btnPrev && btnPrev.addEventListener('click', () => { prev(); start(); });

  // ✅ Pausa no hover (desktop)
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);

  // ✅ Swipe no mobile
  let startX = null;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stop(); // pausa enquanto arrasta
  }, {passive:true});

  carousel.addEventListener('touchend', (e) => {
    if(startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    startX = null;

    if(Math.abs(dx) > 40){
      dx < 0 ? next() : prev();
    }
    start(); // volta a rodar
  });

  // Inicializa
  render();
  start();
})();
