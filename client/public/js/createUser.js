document.querySelector('h1').textContent = 'ACTEMIUM';

const createUser = document.querySelector('.btnCreateUser');
createUser.textContent = 'Créer ';

// Fonction pour récuperer les rôles
function fetchRoles() {
  fetch('http://localhost:3000/api/users/roles')
    .then(response => response.json())
    .then(data => {
      console.log('Roles récupérés', data);

      const roleSelect = document.getElementById('roleLogin');
      const roles = data.data;
      if (Array.isArray(roles) && roles.length > 0) {
        roles.forEach(role => {
          const option = document.createElement('option');
          option.value = role;
          option.textContent = role;
          roleSelect.appendChild(option);
        });
      } else {
        roleSelect.textContent = '<option> Erreur lors de la récupération des roles</option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des rôles', error);
      const roleSelect = document.getElementById('roleLogin');
      roleSelect.innerHTML = '<option>Erreur lors de la récupération des rôles</option>';
    });
}

createUser.addEventListener('click', e => {
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
          window.location.href = '../pages/accueil.html';
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

fetchRoles();
