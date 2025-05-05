document.querySelector('h1').innerText = 'POSTES';
const btnCreerPoste = document.querySelector('.btnCreerPoste');

btnCreerPoste.innerText = 'Créer un poste';

btnCreerPoste.addEventListener('click', () => {
  alert('Création d un nouveau poste');
  window.location.href = '../pages/poste.html';
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

// Chargement des postes depuis le fichier JSON local pour test
fetch('../js/postList.json')
  .then(response => response.json())
  .then(data => {
    console.log('JSON local chargé :', data.postes);

    const postesList = document.getElementById('postesList');
    postesList.innerHTML = '';

    // Sections
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

        sectionItem.addEventListener('click', () => {
          alert(`Souhaites-tu voir le poste : ${poste.nom}`);
        });

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
        });
        groupeA.appendChild(deletePoste);
        postesList.appendChild(groupeA);
      });
    }
  })
  .catch(error => {
    console.error('Erreur lors du chargement du JSON local :', error);
  });
