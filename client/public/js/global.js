const burger = document.getElementById('burger');
const slideMenu = document.querySelector('.slideMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  slideMenu.classList.toggle('active'); // Ajoute une classe CSS si besoin
});
