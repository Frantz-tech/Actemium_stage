export function openAdminPresentation() {
  const existingModal = document.querySelector('.modalAdminConnected');
  if (existingModal) {
    existingModal.classList.add('hide');
    setTimeout(() => {
      existingModal.remove();
    }, 300);
    return;
  }

  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

  // Récupération des infos que l'on veut dans le local storage
  const prenom = utilisateur?.PRENOM;
  const role = utilisateur?.ROLE;
  const email = utilisateur?.EMAIL;
  const ra_id = utilisateur?.RA_ID;

  const modal = document.createElement('div');
  modal.classList.add('modalAdminConnected');
  modal.style.display = 'flex';
  modal.classList.add('show');

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalAdmin_content');

  // Role
  const roleAdmin = document.createElement('div');
  roleAdmin.classList.add('roleAdmin');
  roleAdmin.textContent = role;

  // Bouton gerer mon compte
  const btnGererCompte = document.createElement('button');
  btnGererCompte.classList.add('btnGererCompte');

  const btnGererCompteText = document.createElement('p');
  btnGererCompteText.classList.add('btnGererCompteText');
  btnGererCompteText.textContent = ' Gérer mon comte Actemium';

  // Logo style google dans le modal en dessous du role
  const ra_id_admin = document.createElement('div');
  ra_id_admin.classList.add('ra_id_admin');
  ra_id_admin.textContent = ra_id;

  // Bonjour : 'prénom '
  const helloAdmin = document.createElement('div');
  helloAdmin.classList.add('helloAdmin');
  helloAdmin.textContent = `Bonjour ${prenom} !`;

  // Email
  const emailAdmin = document.createElement('div');
  emailAdmin.classList.add('emailAdmin');
  emailAdmin.textContent = email;

  // Bouton se déconnecter
  const deconnectBtn = document.createElement('button');
  deconnectBtn.classList.add('deconnectBtn');
  const btnText = document.createElement('p');
  btnText.textContent = 'Se déconnecter';
  btnText.classList.add('btnText');

  // Mise a jour du mot de passe si l'utilisateur souhaite le modifier
  // const updatePassword = document.createElement('div');

  // Listener
  modal.addEventListener('click', e => {
    if (!modalContent.contains(e.target)) {
      modal.classList.add('hide');
      setTimeout(() => {
        modal.remove();
      }, 300);

      if (!modal) return;
      const isVisible = modal.classList.contains('show');
      if (!isVisible) openAdminPresentation();
    }
  });

  deconnectBtn.addEventListener('click', () => {
    localStorage.removeItem('token'); // Déconnecter la session

    // Redirection vers la page signIn
    window.location.href = '../pages/signIn.html';
    return;
  });

  // Clique en dehors du contenu → fermeture
  setTimeout(() => {
    document.addEventListener('click', function outsideClickListener(e) {
      if (
        !modalContent.contains(e.target) &&
        e.target !== document.getElementById('connectedBtn')
      ) {
        modal.classList.add('hide');
        setTimeout(() => {
          modal.remove();
        }, 300);
        document.removeEventListener('click', outsideClickListener);
      }
    });
  }, 0);

  // Ecouteur sur le bouton pour gerer son compte
  btnGererCompte.addEventListener('click', e => {
    e.preventDefault();
    alert(
      'Mise en place future de la possibilité de changer le mot de passe, ou le mail de l user / admin'
    );
  });

  // Append & appendChild
  document.body.appendChild(modal);
  modal.appendChild(modalContent);
  deconnectBtn.appendChild(btnText);
  btnGererCompte.appendChild(btnGererCompteText);
  modalContent.append(emailAdmin, ra_id_admin, btnGererCompte, helloAdmin, roleAdmin, deconnectBtn);
}
