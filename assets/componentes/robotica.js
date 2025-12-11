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

// Exemplo: botão de inscrição (pode apontar para checkout)
if (btnInscricao) {
  btnInscricao.addEventListener('click', e => {
    e.preventDefault();
    // Troque pelo link da sua página de pagamento ou formulário
    const checkoutUrl = '#';
    if (checkoutUrl === '#') {
      // fallback: rolar para o topo do formulário (se tiver) ou apenas alert
      alert('Aqui você pode colocar o link da sua página de inscrição/checkout.');
    } else {
      window.open(checkoutUrl, '_blank');
    }
  });
}
