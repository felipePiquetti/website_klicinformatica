// ===============================
//  CARROSSEL INFINITO DE CURSOS
// ===============================
(function initKlicCarousel() {
  const track   = document.querySelector(".kc-carousel-track");
  const btnPrev = document.querySelector(".kc-carousel-btn.kc-prev");
  const btnNext = document.querySelector(".kc-carousel-btn.kc-next");

  if (!track || !btnPrev || !btnNext) return;

  let isAnimating = false;
  let lastAction = null;

  function getStepWidth() {
    const firstCard = track.querySelector(".kc-course-card");
    if (!firstCard) return 0;

    const rect   = firstCard.getBoundingClientRect();
    const styles = window.getComputedStyle(track);
    const gap    = parseFloat(styles.columnGap || styles.gap || 20);

    return rect.width + gap;
  }

  function goNext() {
    if (isAnimating) return;
    const step = getStepWidth();
    if (!step) return;

    isAnimating = true;
    lastAction = "next";

    track.style.transition = "transform 0.45s ease";
    track.style.transform  = `translateX(-${step}px)`;
  }

  function goPrev() {
    if (isAnimating) return;
    const step = getStepWidth();
    if (!step) return;

    isAnimating = true;
    lastAction = "prev";

    const lastCard = track.lastElementChild;
    track.insertBefore(lastCard, track.firstElementChild);

    track.style.transition = "none";
    track.style.transform  = `translateX(-${step}px)`;
    void track.offsetWidth;

    track.style.transition = "transform 0.45s ease";
    track.style.transform  = "translateX(0)";
  }

  track.addEventListener("transitionend", (event) => {
    if (event.target !== track) return;
    if (!isAnimating) return;

    const step = getStepWidth();

    if (lastAction === "next" && step) {
      const firstCard = track.firstElementChild;
      track.appendChild(firstCard);

      track.style.transition = "none";
      track.style.transform  = "translateX(0)";
      void track.offsetWidth;
    } else if (lastAction === "prev") {
      track.style.transition = "none";
      track.style.transform  = "translateX(0)";
    }

    isAnimating = false;
  });

  btnNext.addEventListener("click", goNext);
  btnPrev.addEventListener("click", goPrev);

  window.addEventListener("resize", () => {
    if (isAnimating) return;
    track.style.transition = "none";
    track.style.transform  = "translateX(0)";
  });
})();

// ===============================
//  CARROSSEL TIPO "CARD CENTRAL" (SERVIÇOS)
// ===============================
(function initServicosCarousel() {
  const cards   = Array.from(document.querySelectorAll(".servicos-track .cardS"));
  const btnPrev = document.querySelector(".servicos-btn.prev");
  const btnNext = document.querySelector(".servicos-btn.next");

  if (!cards.length || !btnPrev || !btnNext) return;

  let current = 0;

  function atualizarPosicoes() {
    const total = cards.length;

    cards.forEach(card => {
      card.classList.remove("cardS--active", "cardS--prev", "cardS--next");
    });

    const active = cards[current];
    const prev   = cards[(current - 1 + total) % total];
    const next   = cards[(current + 1) % total];

    if (active) active.classList.add("cardS--active");
    if (total > 1 && prev)  prev.classList.add("cardS--prev");
    if (total > 2 && next)  next.classList.add("cardS--next");
  }

  function irProximo() {
    current = (current + 1) % cards.length;
    atualizarPosicoes();
  }

  function irAnterior() {
    current = (current - 1 + cards.length) % cards.length;
    atualizarPosicoes();
  }

  btnNext.addEventListener("click", irProximo);
  btnPrev.addEventListener("click", irAnterior);

  // inicia com o primeiro card no centro
  atualizarPosicoes();
})();
