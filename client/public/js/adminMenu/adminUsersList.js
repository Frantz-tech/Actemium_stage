import { fetchRoles } from '../get_create_user/getRoles.js';
import { fetchUsers } from '../get_create_user/getUserList.js';
import { handleApiError } from '../tokenHandler/handleApi.js';

export const tableContent = document.createElement('div');
tableContent.classList.add('table_container');

const tableUser = document.createElement('table');
tableUser.classList.add('tableUser');

const tableUserHead = document.createElement('thead');
const tableRow = document.createElement('tr');
const tableUserBody = document.createElement('tbody');

// Mise en place du modal
const newUser = document.createElement('button');
newUser.textContent = 'Ajouter un nouvel utilisateur';
newUser.classList.add('btnNewUserDashboard');

newUser.addEventListener('click', e => {
  // Je dois mettre une verification pour savoir si c'est un admin ? Sachant que on peut pas arriver a cet page sans avoir eu la validation avant du role
  e.preventDefault();
  const existingModal = document.querySelector('.modal');
  if (existingModal) {
    existingModal.remove();
  }
  const modal = document.createElement('div');
  modal.classList.add('modalUser');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');

  const overlay = document.createElement('div');
  overlay.classList.add('modalUser-overlay');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modalUser_content');

  const form = document.createElement('form');
  form.classList.add('newUserForm');
  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.placeholder = 'Nom';
  inputName.id = 'nameLogin';

  const inputFirstName = document.createElement('input');
  inputFirstName.type = 'text';
  inputFirstName.placeholder = 'Prénom';
  inputFirstName.id = 'firstNameLogin';

  const email = document.createElement('input');
  email.type = 'email';
  email.id = 'emailLogin';
  email.placeholder = 'Adresse Email';

  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Mot de passe';
  password.id = 'passwordLogin';

  const role = document.createElement('select');
  role.id = 'roleLogin';
  const optionRole = document.createElement('option');
  optionRole.disabled;
  optionRole.selected;
  optionRole.textContent = 'Rôle';

  //Ajout du bouton creer un utilisateur
  const sumbitNewUser = document.createElement('button');
  sumbitNewUser.classList.add('createNewUserSubmit');
  sumbitNewUser.textContent = 'Créer';

  // Ajout bouton annuler
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('cancelUserBtn');
  cancelBtn.textContent = 'Annuler';
  cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('hide');
    overlay.remove();
    setTimeout(() => {
      document.body.removeChild(modal); // Ferme le modal
    }, 400);
    document.body.classList.remove('noscroll');
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      modal.classList.add('hide');
      overlay.remove();
      setTimeout(() => {
        document.body.removeChild(modal); // Ferme le modal
      }, 400);
      document.body.classList.remove('noscroll');
    }
  });

  const divBtn = document.createElement('div');
  divBtn.classList.add('divBtnModal');

  sumbitNewUser.addEventListener('click', e => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');
    const role = document.getElementById('roleLogin');

    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) allFilled = false;
    });

    if (!role.value.trim()) allFilled = false;

    if (!allFilled) {
      alert('Veuillez remplir tous les champs');
    } else {
      // Crée un objet avec les données du formulaire
      const userData = {
        NOM: document.getElementById('nameLogin').value,
        PRENOM: document.getElementById('firstNameLogin').value,
        EMAIL: document.getElementById('emailLogin').value,
        PASSWORD: document.getElementById('passwordLogin').value,
        ROLE: role.value,
      };

      // Envoie les données au backend
      fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(res => res.json())
        .then(data => {
          handleApiError(data);
          if (data && Array.isArray(data.errors) && data.errors.length > 0) {
            alert('Utilisateur non créé.\nErreur(s) :\n' + data.errors.join('\n'));
            return; // stop here if errors
          }

          if (data && data.errors === undefined) {
            alert('✅ Utilisateur créé avec succès !');
            document.getElementById('nameLogin').value = '';
            document.getElementById('firstNameLogin').value = '';
            document.getElementById('emailLogin').value = '';
            document.getElementById('passwordLogin').value = '';
            document.getElementById('roleLogin').value = '';
            fetchUsers(tableUserBody);
            modal.classList.add('hide');
            overlay.remove();
            setTimeout(() => {
              document.body.removeChild(modal); // Ferme le modal
            }, 400);
            document.body.classList.remove('noscroll');
          } else {
            alert("Erreur inattendue lors de la création de l'utilisateur.");
          }
        })

        .catch(error => {
          console.error("Erreur lors de la création de l'utilisateur :", error);
          alert('Erreur serveur');
        });
    }
  });
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  divBtn.append(sumbitNewUser, cancelBtn);
  form.append(inputName, inputFirstName, email, password, role, divBtn);
  role.appendChild(optionRole);
  modal.appendChild(modalContent);
  modalContent.appendChild(form);
  document.body.appendChild(modal);
  fetchRoles(role);
});

const headers = ['RA_ID', 'Nom', 'Prénom', 'Email', 'Rôle'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.textContent = headerText;
  tableRow.appendChild(th);
});

tableUserHead.appendChild(tableRow);
tableUser.append(tableUserHead, tableUserBody);
tableContent.appendChild(tableUser);
tableContent.appendChild(newUser);

fetchUsers(tableUserBody);
