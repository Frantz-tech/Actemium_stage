document.querySelector('h1').textContent = 'DASHBOARD';

// Menu slide de la gauche

// Main tableau au centre de la page pour afficher la liste des utilisateurs apres le click
// sur liste des devis dans le menu déroulant

const tableContent = document.createElement('div');
const main = document.querySelector('main');
main.appendChild(tableContent);
const tableUser = document.createElement('table');
const tableUserTitle = document.createElement('h2');
tableUserTitle.textContent = 'Liste des utilisateurs';
const tableUserHead = document.createElement('thead');
const tableRow = document.createElement('tr');
const tableUserBody = document.createElement('tbody');

const headers = ['Nom', 'Prénom', 'Email', 'Rôle'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.textContent = headerText;
  tableRow.appendChild(th);
});

function fetchUsers() {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(users => {
      console.log('liste des users :', users);

      users.forEach(user => {
        const row = document.createElement('tr');
        // Pour chaque colonne je créer une cellule
        const nomCell = document.createElement('td');
        nomCell.textContent = user.NOM;
        const prenomCell = document.createElement('td');
        prenomCell.textContent = user.PRENOM;
        const emailCell = document.createElement('td');
        emailCell.textContent = user.EMAIL;
        const roleCell = document.createElement('td');
        roleCell.textContent = user.ROLE;
        row.append(nomCell, prenomCell, emailCell, roleCell);
        tableUserBody.appendChild(row);
      });
    });
}
tableUserHead.appendChild(tableRow);
tableUser.append(tableUserHead, tableUserBody);
tableContent.appendChild(tableUserTitle);
tableContent.appendChild(tableUser);

fetchUsers();
