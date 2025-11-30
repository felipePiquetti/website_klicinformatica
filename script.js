// HEADER – aplica classe quando a página é rolada
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Contador animado
const contar = () => {
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target;
    const speed = 100;
    const increment = target / speed;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.ceil(current);
      }
    }, 20);
  });
};

// Ativa contador quando entra na tela
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    contar();
    observer.disconnect();
  }
}, { threshold: 0.7 });

observer.observe(document.querySelector('.cards-container'));

// Carrossel de cursos (simples e funcional)
document.querySelectorAll('.btn-curso-prev').forEach(btn => {
  btn.addEventListener('click', () => {
    const trilha = btn.closest('.carrossel-cursos').querySelector('.trilha-cursos');
    trilha.scrollBy({ left: -380, behavior: 'smooth' });
  });
});
document.querySelectorAll('.btn-curso-next').forEach(btn => {
  btn.addEventListener('click', () => {
    const trilha = btn.closest('.carrossel-cursos').querySelector('.trilha-cursos');
    trilha.scrollBy({ left: 380, behavior: 'smooth' });
  });
});

// ===============================
//  Carrossel dos cursos (scroll infinito)
// ===============================
(function carrosselCursosKlic() {
  const linhaCursos = document.querySelector(".trilha-cursos");
  const botaoVoltarCurso = document.querySelector(".btn-carrossel-curso.btn-curso-prev");
  const botaoIrCurso = document.querySelector(".btn-carrossel-curso.btn-curso-next");

  if (!linhaCursos || !botaoVoltarCurso || !botaoIrCurso) return;

  let travadoAnimacao = false;
  let ultimaDirecao = null;

  function calcularLarguraCard() {
    const primeiroCard = linhaCursos.querySelector(".card-curso");
    if (!primeiroCard) return 0;

    const rectCard = primeiroCard.getBoundingClientRect();
    const estilosTrack = window.getComputedStyle(linhaCursos);
    const espacoEntre =
      parseFloat(estilosTrack.columnGap || estilosTrack.gap || 20);

    return rectCard.width + espacoEntre;
  }

  function passarProLadoDireito() {
    if (travadoAnimacao) return;

    const passo = calcularLarguraCard();
    if (!passo) return;

    travadoAnimacao = true;
    ultimaDirecao = "proximo";

    linhaCursos.style.transition = "transform 0.45s ease";
    linhaCursos.style.transform = `translateX(-${passo}px)`;
  }

  function passarProLadoEsquerdo() {
    if (travadoAnimacao) return;

    const passo = calcularLarguraCard();
    if (!passo) return;

    travadoAnimacao = true;
    ultimaDirecao = "anterior";

    const ultimoCard = linhaCursos.lastElementChild;
    linhaCursos.insertBefore(ultimoCard, linhaCursos.firstElementChild);

    linhaCursos.style.transition = "none";
    linhaCursos.style.transform = `translateX(-${passo}px)`;
    void linhaCursos.offsetWidth; // força repaint

    linhaCursos.style.transition = "transform 0.45s ease";
    linhaCursos.style.transform = "translateX(0)";
  }

  linhaCursos.addEventListener("transitionend", (evento) => {
    if (evento.target !== linhaCursos) return;
    if (!travadoAnimacao) return;

    const passo = calcularLarguraCard();

    if (ultimaDirecao === "proximo" && passo) {
      const primeiroCard = linhaCursos.firstElementChild;
      linhaCursos.appendChild(primeiroCard);

      linhaCursos.style.transition = "none";
      linhaCursos.style.transform = "translateX(0)";
      void linhaCursos.offsetWidth;
    } else if (ultimaDirecao === "anterior") {
      linhaCursos.style.transition = "none";
      linhaCursos.style.transform = "translateX(0)";
    }

    travadoAnimacao = false;
  });

  botaoIrCurso.addEventListener("click", passarProLadoDireito);
  botaoVoltarCurso.addEventListener("click", passarProLadoEsquerdo);

  window.addEventListener("resize", () => {
    if (travadoAnimacao) return;
    linhaCursos.style.transition = "none";
    linhaCursos.style.transform = "translateX(0)";
  });
})();

// ===============================
//  Carrossel dos serviços (card central)
// ===============================
(function carrosselServicosKlic() {
  const cartoesServicos = Array.from(
    document.querySelectorAll(".trilha-servicos .card-servico")
  );
  const botaoVoltarServico = document.querySelector(".btn-carrossel-servico.btn-servico-prev");
  const botaoAvancarServico = document.querySelector(".btn-carrossel-servico.btn-servico-next");

  if (!cartoesServicos.length || !botaoVoltarServico || !botaoAvancarServico) {
    return;
  }

  let indiceAtual = 0;

  function arrumarClassesCards() {
    const totalCards = cartoesServicos.length;

    cartoesServicos.forEach((cartao) => {
      cartao.classList.remove(
        "card-servico-ativo",
        "card-servico-anterior",
        "card-servico-proximo"
      );
    });

    const cartaoAtivo = cartoesServicos[indiceAtual];
    const cartaoAnterior =
      cartoesServicos[(indiceAtual - 1 + totalCards) % totalCards];
    const cartaoProximo =
      cartoesServicos[(indiceAtual + 1) % totalCards];

    if (cartaoAtivo) cartaoAtivo.classList.add("card-servico-ativo");
    if (totalCards > 1 && cartaoAnterior)
      cartaoAnterior.classList.add("card-servico-anterior");
    if (totalCards > 2 && cartaoProximo)
      cartaoProximo.classList.add("card-servico-proximo");
  }

  function andarPraFrenteServico() {
    indiceAtual = (indiceAtual + 1) % cartoesServicos.length;
    arrumarClassesCards();
  }

  function andarPraTrasServico() {
    indiceAtual = (indiceAtual - 1 + cartoesServicos.length) % cartoesServicos.length;
    arrumarClassesCards();
  }

  botaoAvancarServico.addEventListener("click", andarPraFrenteServico);
  botaoVoltarServico.addEventListener("click", andarPraTrasServico);

  // começa com o primeiro card no meio
  arrumarClassesCards();
})();

