document.querySelector('h1').innerText = 'DEVIS';
const btnCreerDevis = document.querySelector('.btnCreer');
btnCreerDevis.innerText = 'Créer un devis';

btnCreerDevis.addEventListener('click', () => {
  alert('Création d un nouveau devis');
  window.location.href = '../pages/devis.html';
});

// fonction pour récupérer la liste des devis

// function fetchDevis() {
//   fetch('route get de api/devis')
//     .then(response => response.json())
//     .then(data => {
//       console.log('fetchDevis | Devis récupérés : ', data);

//       const devisList = document.getElementById('devisList');
//       const devis = data.data;
//       devisList.textContent = ''; // A voir car normalement il faut mettre innerhtml pour que cela vide le contenu

//       if (Array.isArray(devis) && devis.length > 0) {
//         devis.forEach(devi => {
//           const devisItem = document.createElement('div');
//           devisItem.innerHTML = `<p>Libellé : ${devi.libelle}</p> <p>N° Codex : ${devi.code_codex}</p>`;
//           devisList.appendChild(devisItem);
//           devisItem.classList.add('devisItem');
//         });
//       } else {
//         devisList.innerHTML = '<p> Aucun devis trouvé </p>';
//       }
//     })
//     .catch(error => {
//       console.error('Erreur lors de la récupération des devis : ', error);
//       const devisList = document.getElementById('devisList');
//       devisList.innerHTML = ' <p> Erreur lors de la récupération des devis </p>';
//     });
// }

// Chargement des devis depuis le fichier JSON local pour test
fetch('../js/devisList.json')
  .then(response => response.json())
  .then(data => {
    console.log('JSON local chargé :', data);

    const devisList = document.getElementById('devisList');
    devisList.innerHTML = '';

    data.forEach(devi => {
      const groupeA = document.createElement('div');
      groupeA.classList.add('groupeLibelle');

      const devisItem = document.createElement('div');
      devisItem.innerHTML = `<p>Libellé : ${devi.libelle}</p> <p>N° : ${devi.code_codex}</p>`;
      devisItem.classList.add('devisItem');

      devisItem.addEventListener('click', () => {
        alert(`Souhaites-tu voir le devis N° : ${devi.code_codex} ?`);
      });

      const deleteDevis = document.createElement('div');
      deleteDevis.classList.add('deletebtn');

      deleteDevis.addEventListener('click', () => {
        const confirmation = confirm(
          `Êtes-vous sûr de vouloir supprimer le devis ${devi.code_codex}  ? Cette action est irréversible.`
        ); // Confirmation pour supprimer un devis, a faire également pour les postes dans le js postesListes
        if (confirmation) {
          const removed = devisList.removeChild(groupeA);
          console.log('Élément supprimé :', removed);
        }
      });

      groupeA.appendChild(devisItem);
      groupeA.appendChild(deleteDevis);

      devisList.appendChild(groupeA);
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du JSON local :', error);
  });
