document.querySelector('h1').innerText = 'ACTEMIUM';

const loginForm = document.querySelector('.loginForm');
const btnSignIn = document.querySelector('.btnSignIn');

btnSignIn.innerText = 'Se Connecter';

const tryLogin = async (url, email, password) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return { response, data };
};
// Écoute la soumission du formulaire
loginForm.addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('emailLogin').value.trim();
  const password = document.getElementById('passwordLogin').value.trim();

  if (!email || !password) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  try {
    // Route admin

    let { response, data } = await tryLogin(
      'http://localhost:3000/api/admin/login',
      email,
      password
    );

    // Sinon route utilisateurs RA ou CA ?
    if (!response.ok) {
      ({ response, data } = await tryLogin(
        'http://localhost:3000/api/users/login',
        email,
        password
      ));
    }

    if (response.ok) {
      localStorage.setItem('token', data.data.token);

      console.log(data);
      // Redirection vers la page d'accueil admin (à adapter)
      if (data.data.user && data.data.user.ROLE) {
        const role = data.data.user.ROLE.trim().toLowerCase();
        console.log('Role détecté:', role);
        if (role === 'administrateur') {
          window.location.href = '../pages/adminDashboard.html';
          alert('Connexion réussie, vous allez être redirigé vers la page admin');
        } else if (role === 'responsable d affaire' || role === 'chargé d affaire') {
          const mustChangePassword = data.data.user.MUST_CHANGE_PASSWORD;
          const mustChangePasswordBool = Boolean(Number(mustChangePassword));
          if (mustChangePasswordBool) {
            ////
            const existingModal = document.querySelector('.modalPasswordLogin');
            if (existingModal) {
              existingModal.remove();
            }
            const existingOverlay = document.querySelector('.modalPassword-overlay');
            if (existingOverlay) {
              existingOverlay.remove();
            }
            const modal = document.createElement('div');
            modal.classList.add('modalPasswordLogin');
            modal.classList.add('show');
            document.body.classList.add('noscroll');

            const overlay = document.createElement('div');
            overlay.classList.add('modalPassword-overlay');

            const modalContent = document.createElement('div');
            modalContent.classList.add('modalPassword_content');

            const form = document.createElement('form');
            form.classList.add('changePasswordForm');

            const inputNewPassword = document.createElement('input');
            inputNewPassword.type = 'password';
            inputNewPassword.placeholder = 'Nouveau mot de passe';
            inputNewPassword.id = 'newPassword';

            const inputConfirmPassword = document.createElement('input');
            inputConfirmPassword.type = 'password';
            inputConfirmPassword.placeholder = 'Confirmer le mot de passe';
            inputConfirmPassword.id = 'confirmPassword';

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Modifier le mot de passe';
            submitButton.id = 'sumbitUpdatePassword';

            overlay.addEventListener('click', e => {
              if (e.target === overlay) {
                alert('Vous devez modifier votre mot de passe');
                inputNewPassword.focus();
              }
            });

            form.addEventListener('submit', e => {
              e.preventDefault();

              const newPassword = inputNewPassword.value.trim();
              const confirmNewPassword = inputConfirmPassword.value.trim();
              if (newPassword === '' || confirmNewPassword === '') {
                alert('Veuillez remplir les deux champs');
                return;
              }
              if (newPassword !== confirmNewPassword) {
                alert('Les mots de passes doivent être identique');
                return;
              }
              try {
                // Envoie des mots de passe en backend
                // Si la reponse est ok => remove le modal et l'overlay et redirection vers la page d'accueil
                if (response.ok) {
                  modal.classList.add('hide');
                  overlay.remove();
                  document.body.classList.remove('noscroll');
                  setTimeout(() => {
                    window.location.href = '';
                  }, 1000);
                }
              } catch (error) {
                alert('Erreur réseau');
                console.error(error);
              }
            });

            document.body.appendChild(overlay);
            overlay.appendChild(modal);
            modal.appendChild(modalContent);
            modalContent.appendChild(form);
            form.append(inputNewPassword, inputConfirmPassword, submitButton);
            inputNewPassword.focus();
            ///
          }
        }
      } else {
        console.log('Aucun rôle détecté dans data.data.user');
      }
    } else {
      alert('Erreur : ' + data.message);
    }
  } catch (error) {
    alert('Erreur réseau ou serveur');
    console.error(error);
  }
});
