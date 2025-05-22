export function fetchUsers(tableUserBody) {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(users => {
      tableUserBody.innerHTML = '';
      console.log('liste des users :', users);
      const userList = users.data;

      userList.forEach(user => {
        const row = document.createElement('tr');
        // Pour chaque colonne je créer une cellule
        const raid = document.createElement('td');
        raid.textContent = user.RA_ID;
        const nomCell = document.createElement('td');
        nomCell.textContent = user.NOM;
        const prenomCell = document.createElement('td');
        prenomCell.textContent = user.PRENOM;
        const emailCell = document.createElement('td');
        emailCell.textContent = user.EMAIL;
        const roleCell = document.createElement('td');
        roleCell.textContent = user.ROLE;
        row.append(raid, nomCell, prenomCell, emailCell, roleCell);
        tableUserBody.appendChild(row);
      });
    });
}
