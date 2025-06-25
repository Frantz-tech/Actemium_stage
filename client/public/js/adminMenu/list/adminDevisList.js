// Partie Liste des devis

import { fetchAllDevis } from '../getDevis/getAllDevis.js';

export const tableDevisContent = document.createElement('div');
tableDevisContent.classList.add('table_devis_container');

const sectionsDevis = {
  'Liste des devis': tableDevisContent, // Affiche la liste des devis
};

sectionsDevis['Liste des devis'].style.display = 'none'; // par défaut

const tableDevis = document.createElement('table');
const tableDevisHead = document.createElement('thead');
const tableDevisRow = document.createElement('tr');
const tableDevisBody = document.createElement('tbody');

const headersDevis = [
  'Devis_ref',
  'Libelle',
  'Nom Client',
  'Client',
  'Expertise',
  'Domaine',
  'Contrat',
  'État',
  'Date',
];
headersDevis.forEach(headerDevisText => {
  const thDevis = document.createElement('th');
  thDevis.textContent = headerDevisText;
  tableDevisRow.appendChild(thDevis);
});

tableDevisHead.appendChild(tableDevisRow);
tableDevis.append(tableDevisHead, tableDevisBody);
tableDevisContent.appendChild(tableDevis);

fetchAllDevis(tableDevisBody);
