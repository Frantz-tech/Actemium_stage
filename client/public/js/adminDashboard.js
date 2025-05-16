document.querySelector('h1').textContent = 'DASHBOARD';
const main = document.querySelector('main');
const openSlide = document.getElementById('logo');

// Menu slide de la gauche
const slideMenu = document.createElement('div');
slideMenu.classList.add('slideMenuDashboard');

openSlide.addEventListener('click', () => {
  slideMenu.classList.toggle('open');
});

const menuUl = document.createElement('ul');
slideMenu.appendChild(menuUl);

const menuItem = [
  'Liste des utilisateurs',
  'Liste des devis',
  'Statistiques',
  'Paramètres',
  'Configuration',
];
menuItem.forEach(itemText => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.classList.add('menuBtn');
  button.textContent = itemText;
  li.appendChild(button);
  menuUl.appendChild(li);

  button.addEventListener('click', e => {
    e.preventDefault();
    // Fermer automatiquement le panneau latéral
    slideMenu.classList.remove('open');
    // Cacher toutes les sections
    Object.values(sections).forEach(section => {
      section.style.display = 'none';
    });

    // Afficher la section liée au menu cliqué si elle existe
    if (sections[itemText]) {
      sections[itemText].style.display = 'block'; // ou 'flex' selon ton CSS
    }
  });
});

// Main tableau au centre de la page pour afficher la liste des utilisateurs apres le click
// sur liste des devis dans le menu déroulant

const tableContent = document.createElement('div');
tableContent.classList.add('table_container');
main.append(tableContent, slideMenu);

const sections = {
  'Liste des utilisateurs': tableContent, // Affiche la liste des utilisateurs
  // Tu pourras ajouter d'autres sections ici plus tard, comme 'Liste des devis': devisContent, etc.
};

sections['Liste des utilisateurs'].style.display = 'none'; // par défaut on montre la liste des utilisateurs

const tableUser = document.createElement('table');
const tableUserTitle = document.createElement('h2');
tableUserTitle.textContent = 'Liste des utilisateurs';
const tableUserHead = document.createElement('thead');
const tableRow = document.createElement('tr');
const tableUserBody = document.createElement('tbody');

const headers = ['RA_ID', 'Nom', 'Prénom', 'Email', 'Rôle'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.textContent = headerText;
  tableRow.appendChild(th);
});

function fetchUsers() {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(users => {
      tableUserBody.innerHTML = '';
      console.log('liste des users :', users.data);
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
tableUserHead.appendChild(tableRow);
tableUser.append(tableUserHead, tableUserBody);
tableContent.appendChild(tableUserTitle);
tableContent.appendChild(tableUser);

fetchUsers();
