document.querySelector('h1').innerText = 'POSTES';
const btnCreerPoste = document.querySelector('.btnCreerPoste');
btnCreerPoste.innerText = 'Créer un poste';
const btnModal = document.querySelector('.btnModal');
btnModal.innerText = 'Modifier';
btnModal.addEventListener('click', () => {
  alert('Modifier le poste ');
});
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
          const modal = document.getElementById('modal');
          const modalBody = document.getElementById('modal_body');
          const closeBtn = document.querySelector('.close-btn');
          modalBody.innerHTML = '';

          //Nom du poste
          const posteTitle = document.createElement('div');
          posteTitle.classList.add('modalPostTitle');
          posteTitle.textContent = `${poste.nom}`;
          modalBody.appendChild(posteTitle);

          //SECTION
          const sectionTitle = document.createElement('div');
          sectionTitle.textContent = 'SECTION';
          sectionTitle.classList.add('modalSectionAchatFraisTitle');
          modalBody.appendChild(sectionTitle);

          const section = document.createElement('div');
          section.classList.add('blockListModal');
          modalBody.appendChild(section);
          const sectionList = document.createElement('ul');
          section.appendChild(sectionList);

          poste.section.forEach(sections => {
            const liSection = document.createElement('li');
            liSection.classList.add('liModal');
            sectionList.appendChild(liSection);
            liSection.textContent = `${sections.poste_occupe} - ${sections.code_section} - ${sections.nb_heures} x ${sections.taux_horaire}€/h = ${sections.total}€ `;
          });

          // ACHAT
          const achatTitle = document.createElement('div');
          achatTitle.textContent = 'ACHAT';
          achatTitle.classList.add('modalSectionAchatFraisTitle');
          modalBody.appendChild(achatTitle);

          const achat = document.createElement('div');
          achat.classList.add('blockListModal');
          modalBody.appendChild(achat);
          const achatList = document.createElement('ul');
          achat.appendChild(achatList);

          poste.achats.forEach(a => {
            const liAchat = document.createElement('li');
            liAchat.classList.add('liModal');
            achatList.appendChild(liAchat);
            liAchat.textContent = `${a.code_achat} - ${a.nom_produit} - ${a.quantite}${a.unite} x ${a.prix_unitaire}€ = ${a.total}€ `;
          });

          // FRAIS DE CHANTIER
          const fraisTitle = document.createElement('div');
          fraisTitle.textContent = 'FRAIS DE CHANTIER';
          fraisTitle.classList.add('modalSectionAchatFraisTitle');
          modalBody.appendChild(fraisTitle);
          const frais = document.createElement('div');
          frais.classList.add('blockListModal');
          modalBody.appendChild(frais);
          const fraisList = document.createElement('ul');
          frais.appendChild(fraisList);

          poste.frais_chantier.forEach(f => {
            const liFrais = document.createElement('li');
            liFrais.classList.add('liModal');
            fraisList.appendChild(liFrais);
            liFrais.textContent = `${f.code_frais} - ${f.nom_produit} - ${f.quantite}${f.unite} x ${f.prix_unitaire}€ = ${f.total}€ `;
          });

          modal.classList.remove('hidden');

          closeBtn.onclick = () => modal.classList.add('hidden');
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
