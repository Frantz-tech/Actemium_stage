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
  const role = document.querySelectorAll('roleLogin');

  let allFilled = true;

  inputs.forEach(input => {
    if (!input.value.trim()) allFilled = false;
  });

  role.forEach(role => {
    if (!role.value.trim()) allFilled = false;
  });

  if (!allFilled) {
    alert('Veuillez remplir tous les champs');
  } else {
    // ici vous pouvez envoyer les données
    console.log('Formulaire valide');
  }
});

fetchRoles();
