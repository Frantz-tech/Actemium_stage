import { handleApiError } from '../tokenHandler/handleApi.js';

export function fetchAllDevis(tableDevisBody) {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/devis', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(devis => {
      handleApiError;
      console.log('Liste des devis :', devis);
      tableDevisBody.innerHTML = '';
      const devisList = devis.data;
      if (Array.isArray(devisList)) {
        devisList.forEach(devis => {
          //Chaque colonne je crée une cellule correspondant a ce que je veux recup de devis
          const row = document.createElement('tr');
          const devis_ref = document.createElement('td');
          devis_ref.textContent = devis.DEVIS_REF;
          const libelle = document.createElement('td');
          libelle.textContent = devis.LIBELLE;
          const cmdtName = document.createElement('td');
          cmdtName.textContent = devis.NOM;
          const clientName = document.createElement('td');
          clientName.textContent = devis.NOM_CLIENT;
          const expertiseName = document.createElement('td');
          expertiseName.textContent = devis.NOM_EXPERTISE;
          const domaineName = document.createElement('td');
          domaineName.textContent = devis.NOM_DOMAINE;
          const contratName = document.createElement('td');
          contratName.textContent = devis.NOM_CONTRAT;
          const etatDevis = document.createElement('td');
          etatDevis.textContent = devis.ETAT;
          const dateCreationDevis = document.createElement('td');
          dateCreationDevis.textContent = formatDate(devis.DATE_CREATION);

          row.append(
            devis_ref,
            libelle,
            cmdtName,
            clientName,
            expertiseName,
            domaineName,
            contratName,
            etatDevis,
            dateCreationDevis
          );

          tableDevisBody.appendChild(row);
        });
      }
    });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Jour 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois 2 chiffres (0-based)
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
