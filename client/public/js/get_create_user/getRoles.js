// Fonction pour récuperer les rôles
export function fetchRoles() {
  const roleSelect = document.getElementById('roleLogin');
  fetch('http://localhost:3000/api/users/roles')
    .then(response => response.json())
    .then(data => {
      console.log('Roles récupérés', data);

      const roles = data.data;
      if (Array.isArray(roles) && roles.length > 0) {
        roles.forEach(role => {
          const option = document.createElement('option');
          option.value = role;
          option.textContent = role;
          roleSelect.appendChild(option);
        });
      } else {
        roleSelect.innerHTML = '<option> Erreur lors de la récupération des roles</option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des rôles', error);
      const roleSelect = document.getElementById('roleLogin');
      roleSelect.innerHTML = '<option>Erreur lors de la récupération des rôles</option>';
    });
}
