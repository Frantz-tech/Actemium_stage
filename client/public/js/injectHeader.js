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

      const burger = document.getElementById('burger');
      const slideMenu = document.querySelector('.slideMenu');
      const logoEvent = document.getElementById('logo');
      const currentPage = window.location.pathname.split('/').pop();
      if (currentPage === 'adminDashboard.html') {
        logoEvent.style.cursor = 'pointer';
        logoEvent.addEventListener('click', () => {
          const dashboardSlide = document.getElementById('slideMenuDashboard');
          if (dashboardSlide) {
            dashboardSlide.classList.toggle('open');
          }
        });
      } else if (currentPage !== 'signIn.html' && currentPage !== 'createUser.html') {
        logoEvent.style.cursor = 'pointer';
        logoEvent.addEventListener('click', e => {
          e.preventDefault();
          window.location.href = '../pages/accueil.html';
        });
      } else if (logoEvent) {
        logoEvent.style.cursor = 'default';
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
