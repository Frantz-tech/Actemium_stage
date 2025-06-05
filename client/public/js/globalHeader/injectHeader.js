import { openUserPresentation } from './modalUser.js';

fetch('../pages/header.html')
  .then(res => res.text())
  .then(data => {
    const container = document.querySelector('.header_container');
    if (container) {
      container.innerHTML = data;

      const type = container.dataset.type;
      if (type === 'simple') {
        const nav = container.querySelector('.header_dynamique');
        if (nav) nav.style.display = 'none';
      }

      const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
      const ra_id = utilisateur?.RA_ID;
      const burger = document.getElementById('burger');
      const slideMenu = document.querySelector('.slideMenu');
      const logoEvent = document.getElementById('logo');
      const currentPage = window.location.pathname.split('/').pop();
      const currentHost = window.location.host;
      const connectedBtn = document.getElementById('connectedBtn');

      if (logoEvent) {
        const isDashboard = currentPage === 'adminDashboard.html';
        const isAuthPage =
          currentPage === 'signIn.html' ||
          currentPage === 'createUser.html' ||
          (window.location.pathname === '/' && currentHost === 'localhost:4000');

        if (isDashboard) {
          logoEvent.style.cursor = 'pointer';
          logoEvent.addEventListener('click', () => {
            const dashboardSlide = document.getElementById('slideMenuDashboard');
            if (dashboardSlide) {
              dashboardSlide.classList.toggle('open');
            }
          });
        } else if (!isAuthPage) {
          logoEvent.style.cursor = 'default';
          // logoEvent.addEventListener('click', e => {
          //   e.preventDefault();
          //   alert(
          //     'Mettre en place un burger qui permet de se connecter / se déconnecter et aussi un changement de mot de passe par ex'
          //   );
          // });
        } else {
          logoEvent.style.cursor = 'default';
        }
      }

      if (connectedBtn) {
        const pageBtnConnected =
          currentPage === 'accueil.html' ||
          currentPage === 'devis.html' ||
          currentPage === 'devisList.html' ||
          currentPage === 'fap.html' ||
          currentPage === 'poste.html' ||
          currentPage === 'postesList.html';

        if (pageBtnConnected) {
          connectedBtn.textContent = `${ra_id}`;

          // Ecouteur sur le clic du bouton qui indique que l'on est connecté
          connectedBtn.addEventListener('click', () => {
            openUserPresentation();
          });
        } else {
          connectedBtn.style.display = 'none';
        }
      }

      if (burger && slideMenu) {
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
      }
    }
  })
  .catch(err => console.error('Erreur lors du chargement du header :', err));
