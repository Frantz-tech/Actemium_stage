import { afficherModalPoste } from './modalPoste.js';

document.querySelector('h1').innerText = 'POSTES';

const btnCreerPoste = document.querySelector('.btnCreerPoste');
btnCreerPoste.innerText = 'Créer un poste';
btnCreerPoste.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  const ra_id = urlParams.get('ra_id');
  if (!devis_id || !ra_id) {
    alert("il manque le devis_id ou le ra_id dans l'URL");
    return;
  }
  alert("Création d un nouveau poste + redirection vers la création d'un poste lié au devis");
  window.location.href = `../pages/poste.html?devis_id=${devis_id}&ra_id=${ra_id}`;
});
// Action du bouton qui génère la FAP
let btnCreerFap = document.querySelector('.btnCreerFap');
btnCreerFap.textContent = 'Générer FAP';
btnCreerFap.addEventListener('click', () => {
  window.location.href = '../pages/fap.html';
});
// Chargement des postes depuis le fichier JSON local pour test
fetch('../js/postList.json')
  .then(response => response.json())
  .then(data => {
    console.log('JSON local chargé :', data.postes);

    const postesList = document.getElementById('postesList');
    postesList.innerHTML = '';

    // On verifie que les données sont bien un tableau et on fait un forEach
    if (Array.isArray(data.postes)) {
      data.postes.forEach(poste => {
        const groupeA = document.createElement('div');
        groupeA.classList.add('groupeLibelle');

        const sectionItem = document.createElement('div');
        sectionItem.innerHTML = `
          <p>NOM DU POSTE : ${poste.nom}</p>
        `;
        sectionItem.classList.add('sectionItem');

        groupeA.appendChild(sectionItem);

        // bouton suppression
        const deletePoste = document.createElement('div');
        deletePoste.classList.add('deletebtn');
        deletePoste.addEventListener('click', () => {
          const confirmation = confirm(
            `Êtes-vous sûr de vouloir supprimer le poste ${poste.nom} ? Cette action est irréversible.`
          );
          if (confirmation) {
            const removed = postesList.removeChild(groupeA);
            console.log('Élément supprimé :', removed);
          }
          const checkGroupeLength = document.querySelectorAll('.groupeLibelle');

          if (checkGroupeLength.length > 0) {
            btnCreerFap.style.display = 'flex';
          } else {
            btnCreerFap.style.display = 'none';
          }
        });

        // Utilisation de la fonction afficherModalPoste importée depuis utils/modalPoste.js
        sectionItem.addEventListener('click', () => {
          afficherModalPoste(poste, { lectureSeule: false });
        });

        groupeA.appendChild(deletePoste);
        postesList.appendChild(groupeA);
      });
    }
  })
  .catch(error => {
    console.error('Erreur lors du chargement du JSON local :', error);
  });

// fonction pour récupérer la liste des postes

// function fetchPostes() {
//   fetch('route get de api/poste')
//     .then(response => response.json())
//     .then(data => {
//       console.log('fetchPostes | Postes récupérés : ', data);

//       const postesList = document.getElementById('postesList');
//       const postes = data.data;
//       postesList.textContent = ''; // A voir car normalement il faut mettre innerhtml pour que cela vide le contenu

//       if (Array.isArray(postes) && postes.length > 0) {
//         postes.forEach(poste => {
//           const posteItem = document.createElement('div');
//           posteItem.innerHTML = `<p>Libellé : ${devi.libelle}</p> <p>N° Codex : ${devi.code_codex}</p>`;
//           posteListe.appendChild(posteItem);
//           posteItem.classList.add('posteItem');
//         });
//       } else {
//         posteListe.innerHTML = '<p> Aucun poste trouvé </p>';
//       }
//     })
//     .catch(error => {
//       console.error('Erreur lors de la récupération des postes : ', error);
//       const postesList = document.getElementById('postesList');
//       postesList.innerHTML = ' <p> Erreur lors de la récupération des postes </p>';
//     });
// }
