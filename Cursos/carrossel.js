// carrossel.js
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.courses-track');
    const arrows = document.querySelectorAll('.courses-arrow');
    const cardWidth = 250; // Largura aproximada do card + gap
    const gap = 20;

    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const dir = this.classList.contains('prev') ? -1 : 1;
            const scrollAmount = (cardWidth + gap) * dir;
            
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });

    // Opcional: Auto-scroll ou indicadores, mas mantido simples
});