export function openUserPresentation() {
  const existingModal = document.querySelector('.modalUserConnected');
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
  modal.classList.add('modalUserConnected');
  modal.style.display = 'flex';
  modal.classList.add('show');

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalUser_content');

  // Role de l'utilisateur
  const roleUser = document.createElement('div');
  roleUser.classList.add('roleUser');
  roleUser.textContent = role;

  // Bouton gerer mon compte
  const btnGererCompte = document.createElement('button');
  btnGererCompte.classList.add('btnGererCompte');

  const btnGererCompteText = document.createElement('p');
  btnGererCompteText.classList.add('btnGererCompteText');
  btnGererCompteText.textContent = ' Gérer mon comte Actemium';

  // Logo style google dans le modal en dessous du role
  const ra_id_user = document.createElement('div');
  ra_id_user.classList.add('ra_id_user');
  ra_id_user.textContent = ra_id;

  ra_id_user.addEventListener('click', () => {
    alert('Ajout du patch pour modifier l avatar du RA');
  });

  // Bonjour : 'prénom du ra'
  const helloUser = document.createElement('div');
  helloUser.classList.add('helloUser');
  helloUser.textContent = `Bonjour ${prenom} !`;

  // Email de l'utilisateur
  const emailUser = document.createElement('div');
  emailUser.classList.add('emailUser');
  emailUser.textContent = email;

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
      if (!isVisible) openUserPresentation();
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
  btnGererCompte.append(btnGererCompteText);
  modalContent.append(emailUser, ra_id_user, btnGererCompte, helloUser, roleUser, deconnectBtn);
}
