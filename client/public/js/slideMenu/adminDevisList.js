// Partie Liste des devis

export const tableDevisContent = document.createElement('div');
tableDevisContent.classList.add('table_devis_container');

const sectionsDevis = {
  'Liste des devis': tableDevisContent, // Affiche la liste des utilisateurs
};

sectionsDevis['Liste des devis'].style.display = 'none'; // par défaut

const tableDevis = document.createElement('table');
const tableDevisHead = document.createElement('thead');
const tableDevisRow = document.createElement('tr');
const tableDevisBody = document.createElement('tbody');

const headersDevis = [
  'DEVIS_REF',
  'Nom',
  'Commanditaire',
  'Client',
  'Expertise',
  'Domaine',
  'Contrat',
  'État',
  'Date de création',
];
headersDevis.forEach(headerDevisText => {
  const thDevis = document.createElement('th');
  thDevis.textContent = headerDevisText;
  tableDevisRow.appendChild(thDevis);
});

// function fetchAllDevis() {
//   fetch('http://localhost:3000/api/devis')
//     .then(response => response.json())
//     .then(devis => {
//       tableDevisBody.innerHTML = '';
//       console.log('liste des devis :', devis.data);
//       const devisList = users.data;

//       devisList.forEach(user => {
//         const row = document.createElement('tr');
//         // Pour chaque colonne je créer une cellule
//         const raid = document.createElement('td');
//         raid.textContent = user.RA_ID;
//         const nomCell = document.createElement('td');
//         nomCell.textContent = user.NOM;
//         const prenomCell = document.createElement('td');
//         prenomCell.textContent = user.PRENOM;
//         const emailCell = document.createElement('td');
//         emailCell.textContent = user.EMAIL;
//         const roleCell = document.createElement('td');
//         roleCell.textContent = user.ROLE;
//         row.append(raid, nomCell, prenomCell, emailCell, roleCell);
//         tableDevisBody.appendChild(row);
//       });
//     });
// }
tableDevisHead.appendChild(tableDevisRow);
tableDevis.append(tableDevisHead, tableDevisBody);
tableDevisContent.appendChild(tableDevis);

// fetchAllDevis();
