const burger = document.getElementById('burger');
const slideMenu = document.querySelector('.slideMenu');
const logoEvent = document.getElementById('logo');

logoEvent.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = '../pages/accueil.html';
});
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  if (slideMenu.classList.contains('hide')) {
    slideMenu.classList.remove('hide');
    slideMenu.classList.add('show');
  } else {
    slideMenu.classList.remove('show');
    slideMenu.classList.add('hide');
  }
});
