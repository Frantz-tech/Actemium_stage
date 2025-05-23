document.querySelector('h1').innerText = 'DEVIS';

// Charger les devis lorsque l'on arrive sur la page liste des devis :
// Fetch la route get devis par RA_ID
function fetchDevisByRaId() {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  const ra_id = utilisateur?.RA_ID;

  fetch(`http://localhost:3000/api/devis/ra/${ra_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Devis récupérés :', data);
      const devis = data.data;

      if (Array.isArray(devis) && devis.length > 0) {
        const grpDevisList = document.createElement('div');
        grpDevisList.id = 'groupeDevisList';

        const contenuDevisList = document.createElement('div');
        contenuDevisList.classList.add('contenuDevisList');

        const devisList = document.createElement('div');
        devisList.id = 'devisList';
        devis.forEach(d => {
          // Contenu du devis
          const devisItem = document.createElement('div');
          devisItem.classList.add('devisItem');

          // Libelle et ref du devis
          const libelleRef = document.createElement('div');
          libelleRef.classList.add('libelleRef');

          //Libelle du devis
          const libelle = document.createElement('p');
          libelle.classList.add('devisLibelle');
          libelle.textContent = d.LIBELLE;

          //Devis_ref
          const devis_ref = document.createElement('p');
          devis_ref.classList.add('devis_ref');
          devis_ref.textContent = d.DEVIS_REF;

          // Bouton aller page liste des postes
          const btnGoToPost = document.createElement('button');
          btnGoToPost.textContent = '⎘';
          btnGoToPost.classList.add('btnGoToPost');

          btnGoToPost.addEventListener('click', () => {
            alert('redirection vers la liste des postes associés a ce devis');
            // window.location.href = '../pages/postesList.html';
          });

          // Supprimer un devis
          const btnDeleteDevis = document.createElement('button');
          btnDeleteDevis.classList.add('deletebtn');

          btnDeleteDevis.addEventListener('click', () => {
            const confirmation = confirm(
              `Êtes-vous sûr de vouloir supprimer le devis ? Cette action est irréversible.`
            ); // Confirmation pour supprimer un devis, a faire également pour les postes dans le js postesListes
            if (confirmation) {
              const removed = devisList.removeChild(devisItem);
              console.log('Élément supprimé :', removed);
            }
          });

          devisList.appendChild(devisItem);
          devisItem.append(libelleRef, btnGoToPost, btnDeleteDevis);
          libelleRef.append(libelle, devis_ref);
        });

        contenuDevisList.appendChild(devisList);
        grpDevisList.appendChild(contenuDevisList);
        const main = document.querySelector('main');
        main.appendChild(grpDevisList);
      }

      const btnCreerDevis = document.createElement('button');
      btnCreerDevis.classList.add('btnCreer');
      btnCreerDevis.textContent = 'Créer un devis';
      btnCreerDevis.addEventListener('click', () => {
        alert('Création d un nouveau devis');
        window.location.href = '../pages/devis.html';
      });

      const main = document.querySelector('main');
      main.append(btnCreerDevis);
    });
}

/* -- Action lors du clique sur le devis -- */
const devisItem = document.createElement('div');
devisItem.classList.add('devisItem');

devisItem.addEventListener('click', e => {
  e.preventDefault();
  // devisItem.addEventListener suite ..
  const modal = document.createElement('div');
  modal.classList.add('modalUser');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');
  const closeBtn = document.createElement('button').classList.add('close-btn');

  const overlay = document.createElement('div');
  overlay.classList.add('modalDevis-overlay');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modalDevis_content');

  //Libelle du devis
  const devisLibelle = document.createElement('div');
  devisLibelle.textContent = ``;
  devisLibelle.classList.add('modalDevisLibelle');

  // Groupe de la segmentation et le N°Codex + RA_ID
  const groupSegmCodexRa = document.createElement('div');
  groupSegmCodexRa.classList.add('groupeSegmCodexRa');
  groupSegmCodexRa.appendChild(groupSegm);

  // Div pour regrouper la segmentation
  const groupSegm = document.createElement('div');
  groupSegm.classList.add('groupSegm');

  // N°Codex RA_ID Etat
  const devisCodexRa = document.createElement('div');
  devisCodexRa.textContent = ``;
  devisCodexRa.classList.add('modalDevisCodexRa');

  // Commanditaire
  const devisCommanditaire = document.createElement('div');
  devisCommanditaire.textContent = ``;
  devisCommanditaire.classList.add('modalCommanditaire');

  // Client
  const devisClient = document.createElement('div');
  devisClient.textContent = ``;
  devisClient.classList.add('modalSegm');

  // Expertise
  const devisExpertise = document.createElement('div');
  devisExpertise.textContent = ``;
  devisExpertise.classList.add('modalSegm');

  // Domaine
  const devisDomaine = document.createElement('div');
  devisDomaine.textContent = ``;
  devisDomaine.classList.add('modalSegm');

  // Contrat
  const devisContrat = document.createElement('div');
  devisContrat.textContent = ``;
  devisContrat.classList.add('modalSegm');

  // Modifier le devis
  const btnModifier = document.createElement('button').classList.add('btnModal');
  btnModifier.innerText = 'Modifier';
  btnModifier.addEventListener('click', () => {
    alert('Modifier le devis ');
  });

  // AppendChild && Append
  overlay.appendChild(modal);
  modal.appendChild(modalContent);
  modalContent.append(devisLibelle, groupSegmCodexRa);
  groupSegmCodexRa.appendChild(devisCodexRa);
  groupSegm.append(devisCommanditaire, devisClient, devisExpertise, devisDomaine, devisContrat);

  // Modal action
  modal.classList.remove('hidden');
  document.body.classList.add('noscroll');
  closeBtn.onclick = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('noscroll');
  };
});

fetchDevisByRaId();
