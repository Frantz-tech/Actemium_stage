const burger = document.getElementById('burger');
const slideMenu = document.querySelector('.slideMenu');
const logoEvent = document.getElementById('logo');

logoEvent.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = '../pages/accueil.html';
});
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  slideMenu.classList.toggle('active'); // Ajoute une classe CSS si besoin
});
