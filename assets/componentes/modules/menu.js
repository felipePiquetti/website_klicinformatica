 // MENU MOBILE – abre/fecha o hambúrguer
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
    menuToggle.classList.toggle('ativo');
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      menuToggle.classList.remove('ativo');
    });
  });
}
