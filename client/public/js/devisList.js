import { deleteDevis } from './delete/deleteDevis.js';
import { handleApiError } from './tokenHandler/handleApi.js';

document.querySelector('h1').innerText = 'DEVIS';

// Charger les devis lorsque l'on arrive sur la page liste des devis :
// Fetch la route get devis par RA_ID
function fetchDevisByRaId() {
  const existList = document.getElementById('groupeDevisList');
  if (existList) {
    existList.remove();
  }

  const existBtnCreer = document.querySelector('.btnCreer');
  if (existBtnCreer) {
    existBtnCreer.remove();
  }
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
      handleApiError(data);
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
          // Parent de devisItem et les boutons
          const devisContent = document.createElement('div');
          devisContent.classList.add('devisContent');
          // Contenu du devis
          const devisItem = document.createElement('div');
          devisItem.classList.add('devisItem');

          // Libelle et ref du devis
          const libelleRef = document.createElement('div');
          libelleRef.classList.add('libelleRef');

          // Libelle du devis
          const libelle = document.createElement('p');
          libelle.classList.add('devisLibelle');
          libelle.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Libellé : ' })
          );
          libelle.appendChild(document.createTextNode(d.LIBELLE));

          // Numéro du devis
          const devis_ref = document.createElement('p');
          devis_ref.classList.add('devis_ref');
          devis_ref.appendChild(
            Object.assign(document.createElement('strong'), {
              textContent: 'Devis N° : ',
            })
          );
          devis_ref.appendChild(document.createTextNode(d.DEVIS_REF));

          // Bouton aller page liste des postes
          const btnGoToPost = document.createElement('div');
          btnGoToPost.textContent = '⎘';
          btnGoToPost.classList.add('btnGoToPost');

          btnGoToPost.addEventListener('click', () => {
            const url = `../pages/postesList.html?devis_id=${d.DEVIS_ID}&ra_id=${d.RA_ID}`;
            window.location.href = url;
          });

          // Supprimer un devis
          const btnDeleteDevis = document.createElement('button');
          btnDeleteDevis.classList.add('deletebtn');

          btnDeleteDevis.addEventListener('click', async () => {
            const confirmation = confirm(
              `Êtes-vous sûr de vouloir supprimer le devis ? Cette action est irréversible.`
            ); // Confirmation pour supprimer un devis, a faire également pour les postes dans le js postesListes
            if (confirmation) {
              try {
                await deleteDevis(d.DEVIS_ID, d.RA_ID);
                fetchDevisByRaId();
              } catch (error) {
                console.error(`Erreur lors de la suppréssion du devis : ${d.DEVIS_ID}`, error);
                throw error;
              }
            }
          });

          devisList.appendChild(devisContent);
          devisContent.append(devisItem, btnGoToPost, btnDeleteDevis);
          devisItem.append(libelleRef);
          libelleRef.append(libelle, devis_ref);
          /* -- Action lors du clique sur le devis -- */
          devisItem.addEventListener('click', e => {
            e.preventDefault();
            // devisItem.addEventListener suite ..
            const modal = document.createElement('div');
            modal.classList.add('modalDevis');
            document.body.classList.add('noscroll');
            modal.style.display = 'flex';
            modal.classList.add('show');

            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'x';
            closeBtn.classList.add('close-btn');

            const goToFapBtn = document.createElement('button');
            goToFapBtn.textContent = '⎗';
            goToFapBtn.classList.add('goToFapBtnDevis');

            // Regroupement pour les buttons du modal
            const divBtns = document.createElement('div');
            divBtns.classList.add('divBtns');
            divBtns.append(closeBtn, goToFapBtn);

            const overlay = document.createElement('div');
            overlay.classList.add('modalDevis-overlay');

            const modalContent = document.createElement('div');
            modalContent.classList.add('modalDevis_content');

            //Libelle du devis
            const devisLibelle = document.createElement('div');
            devisLibelle.textContent = `${d.LIBELLE}`;
            devisLibelle.classList.add('modalDevisLibelle');

            // Groupe de la segmentation et le N°Codex + RA_ID
            const groupSegmCodexRa = document.createElement('div');
            groupSegmCodexRa.classList.add('groupeSegmCodexRa');

            // Div pour regrouper la segmentation
            const groupSegm = document.createElement('div');
            groupSegm.classList.add('groupSegm');

            // N°Codex RA_ID Etat
            const devisCodexRa = document.createElement('div');
            devisCodexRa.textContent = `${d.DEVIS_REF} - ETAT : ${d.ETAT}`;
            devisCodexRa.classList.add('modalDevisCodexRa');

            // Commanditaire
            const devisCommanditaire = document.createElement('div');
            devisCommanditaire.textContent = `${d.NOM}`;
            devisCommanditaire.classList.add('modalCommanditaire');

            // Client
            const devisClient = document.createElement('div');
            devisClient.textContent = `${d.NOM_CLIENT}`;
            devisClient.classList.add('modalSegm');

            // Expertise
            const devisExpertise = document.createElement('div');
            devisExpertise.textContent = `${d.NOM_EXPERTISE}`;
            devisExpertise.classList.add('modalSegm');

            // Domaine
            const devisDomaine = document.createElement('div');
            devisDomaine.textContent = `${d.NOM_DOMAINE}`;
            devisDomaine.classList.add('modalSegm');

            // Contrat
            const devisContrat = document.createElement('div');
            devisContrat.textContent = `${d.NOM_CONTRAT}`;
            devisContrat.classList.add('modalSegm');

            // Modifier le devis
            const btnModifier = document.createElement('button');
            btnModifier.classList.add('btnModal');
            btnModifier.innerText = 'Modifier';
            btnModifier.addEventListener('click', () => {
              alert('Modifier le devis');
            });

            // AppendChild && Append
            document.body.appendChild(overlay);
            overlay.appendChild(modal);
            modal.append(modalContent, divBtns);
            modalContent.append(devisLibelle, groupSegmCodexRa, btnModifier);
            groupSegmCodexRa.append(devisCodexRa, groupSegm);
            groupSegm.append(
              devisCommanditaire,
              devisClient,
              devisExpertise,
              devisDomaine,
              devisContrat
            );

            // Fermer le modal avec la touche Échap
            const handleEscape = e => {
              if (e.key === 'Escape') {
                modal.classList.add('hide');
                setTimeout(() => {
                  overlay.remove();
                  document.body.removeChild(modal);
                }, 300);
                document.body.classList.remove('noscroll');
                document.removeEventListener('keydown', handleEscape); // Nettoyage du listener
              }
            };
            document.addEventListener('keydown', handleEscape);

            // Modal action btn close
            modal.classList.remove('hidden');
            document.body.classList.add('noscroll');
            closeBtn.addEventListener('click', e => {
              e.preventDefault();
              modal.classList.add('hide');
              setTimeout(() => {
                overlay.remove();
                document.body.removeChild(modal); // Ferme le modal
              }, 300);
              document.body.classList.remove('noscroll');
            });
            overlay.addEventListener('click', e => {
              if (e.target === overlay) {
                modal.classList.add('hide');
                setTimeout(() => {
                  overlay.remove();
                  document.body.removeChild(modal); // Ferme le modal
                }, 300);
                document.body.classList.remove('noscroll');
              }
            });

            // Modal action btn fap
            goToFapBtn.addEventListener('click', e => {
              e.preventDefault();
              const url = `../pages/fap.html?devis_id=${d.DEVIS_ID}&ra_id=${d.RA_ID}`;
              window.location.href = url;
            });
          });
        });

        const btnCreerDevis = document.createElement('button');
        btnCreerDevis.classList.add('btnCreer');
        btnCreerDevis.textContent = 'Créer un devis';

        btnCreerDevis.addEventListener('click', () => {
          window.location.href = `../pages/devis.html?ra_id=${ra_id}`;
        });

        contenuDevisList.appendChild(devisList);
        grpDevisList.appendChild(contenuDevisList);
        const main = document.querySelector('main');
        main.append(grpDevisList, btnCreerDevis);
      }
    });
}

fetchDevisByRaId();
