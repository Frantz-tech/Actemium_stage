document.querySelector('h1').innerText = 'DEVIS';

const btnCreerDevis = document.querySelector('.btnCreer');
btnCreerDevis.innerText = 'Créer un devis';

const btnGoToPostModal = document.querySelector('.goToPostBtn');
btnGoToPostModal.addEventListener('click', () => {
  window.location.href = '../pages/postesList.html';
});

btnCreerDevis.addEventListener('click', () => {
  alert('Création d un nouveau devis');
  window.location.href = '../pages/devis.html';
});

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

      // Contenu du devis
      const devisItem = document.createElement('div');
      devisItem.innerHTML = `<p>Libellé : ${devi.libelle}</p> <p>N° : ${devi.code_codex}</p>`;
      devisItem.classList.add('devisItem');

      // Bouton aller page liste des postes
      const btnGoToFap = document.createElement('div');
      btnGoToFap.textContent = '⎘';
      btnGoToFap.classList.add('btnGoToPost');
      btnGoToFap.addEventListener('click', () => {
        window.location.href = '../pages/fap.html';
      });

      // Supprimer un devis
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

      devisList.appendChild(groupeA);
      groupeA.appendChild(devisItem);
      groupeA.appendChild(deleteDevis);
      groupeA.appendChild(btnGoToFap);

      /* -- Action lors du clique sur le devis -- */

      devisItem.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal_body');
        const closeBtn = document.querySelector('.close-btn');
        modalBody.innerHTML = '';

        //Libelle du devis
        const devisLibelle = document.createElement('div');
        devisLibelle.textContent = `${devi.libelle}`;
        devisLibelle.classList.add('modalDevisLibelle');
        modalBody.appendChild(devisLibelle);

        // Div pour regrouper la segmentation
        const groupSegm = document.createElement('div');
        groupSegm.classList.add('groupSegm');

        // Groupe de la segmentation et le N°Codex + RA_ID
        const groupSegmCodexRa = document.createElement('div');
        groupSegmCodexRa.classList.add('groupeSegmCodexRa');
        groupSegmCodexRa.appendChild(groupSegm);
        modalBody.appendChild(groupSegmCodexRa);

        // N°Codex RA_ID Etat
        const devisCodexRa = document.createElement('div');
        devisCodexRa.textContent = `${devi.code_codex} - ${devi.RA_id} - ETAT : ${devi.etat}`;
        devisCodexRa.classList.add('modalDevisCodexRa');
        groupSegmCodexRa.appendChild(devisCodexRa);

        // Commanditaire
        const devisCommanditaire = document.createElement('div');
        devisCommanditaire.textContent = `${devi.commanditaire}`;
        devisCommanditaire.classList.add('modalCommanditaire');
        groupSegm.appendChild(devisCommanditaire);

        // Client
        const devisClient = document.createElement('div');
        devisClient.textContent = `${devi.client}`;
        devisClient.classList.add('modalSegm');
        groupSegm.appendChild(devisClient);

        // Expertise
        const devisExpertise = document.createElement('div');
        devisExpertise.textContent = `${devi.expertise}`;
        devisExpertise.classList.add('modalSegm');
        groupSegm.appendChild(devisExpertise);

        // Domaine
        const devisDomaine = document.createElement('div');
        devisDomaine.textContent = `${devi.domaine}`;
        devisDomaine.classList.add('modalSegm');
        groupSegm.appendChild(devisDomaine);

        // Contrat
        const devisContrat = document.createElement('div');
        devisContrat.textContent = `${devi.contrat}`;
        devisContrat.classList.add('modalSegm');
        groupSegm.appendChild(devisContrat);

        // Modifier le devis
        const btnModal = document.querySelector('.btnModal');
        btnModal.innerText = 'Modifier';
        btnModal.addEventListener('click', () => {
          alert('Modifier le devis ');
        });

        // Modal action
        modal.classList.remove('hidden');
        document.body.classList.add('noscroll');
        closeBtn.onclick = () => {
          modal.classList.add('hidden');
          document.body.classList.remove('noscroll');
        };
      });
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du JSON local :', error);
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
