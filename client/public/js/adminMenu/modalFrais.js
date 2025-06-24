import { fetchFraisGlobaux } from '../fap/fetchFrais.js';
import { handleApiError } from '../tokenHandler/handleApi.js';

export async function modalFraisAdmin(frais = null) {
  const main = document.querySelector('main');

  const modal = document.createElement('div');
  modal.classList.add('modalFrais');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');

  // Bouton fermeture du modal
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  closeBtn.classList.add('close-btn');
  closeBtn.classList.add('close-btnClient');

  // overlay ( blur )
  const overlay = document.createElement('div');
  overlay.classList.add('modalFrais-overlay');
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalFrais_content');

  // Modal title
  const modalTitle = document.createElement('h3');
  modalTitle.classList.add('modalTitle');
  modalTitle.textContent = 'Nouveau frais';

  const formCreateFrais = document.createElement('form');
  formCreateFrais.classList.add('formCreateFrais');

  // Fieldset pour le nom
  const fsNomFrais = document.createElement('fieldset');
  fsNomFrais.classList.add('fsFrais');

  // label pour le nom
  const labelNomFrais = document.createElement('label');
  labelNomFrais.classList.add('labelModalFrais');
  labelNomFrais.textContent = 'Nom du frais';
  labelNomFrais.htmlFor = 'nomFrais';

  // Input pour le nom
  const nomFrais = document.createElement('input');
  nomFrais.id = 'nomFrais';
  nomFrais.classList.add('nomFraisModal');
  nomFrais.placeholder = 'Nom';
  nomFrais.required = true;

  // Fieldset pour le taux
  const fsTauxFrais = document.createElement('fieldset');
  fsTauxFrais.classList.add('fsFrais');

  // Label pour le taux
  const labelTauxFrais = document.createElement('label');
  labelTauxFrais.classList.add('labelTauxFrais');
  labelTauxFrais.textContent = 'Taux';
  labelTauxFrais.htmlFor = 'tauxFrais';

  // Input pour le taux
  const tauxFrais = document.createElement('input');
  tauxFrais.id = 'tauxFrais';
  tauxFrais.classList.add('tauxFrais');
  tauxFrais.placeholder = 'Taux frais %';
  tauxFrais.required = true;

  // Btn créer le frais
  const btnCreer = document.createElement('button');
  btnCreer.type = 'submit';
  btnCreer.classList.add('btnCreer');
  btnCreer.textContent = 'Créer';

  if (frais) {
    modalTitle.textContent = 'Update frais';
    btnCreer.textContent = 'Modifier';
    nomFrais.value = `${frais.NOM_FRAIS}`;
    tauxFrais.value = `${frais.POURCENTAGE} %`;
    nomFrais.disabled = true;
  } else {
    btnCreer.textContent = 'Créer';
  }

  fsNomFrais.append(labelNomFrais, nomFrais);
  fsTauxFrais.append(labelTauxFrais, tauxFrais);
  formCreateFrais.append(fsNomFrais, fsTauxFrais, btnCreer);

  formCreateFrais.addEventListener('submit', async e => {
    e.preventDefault();
    const nom = document.getElementById('nomFrais').value.trim();
    const taux = document.getElementById('tauxFrais').value.trim().replace('%', '');

    if (nom.length < 3) {
      alert('Le nom du frais doit faire au minimum 3 charactères.');
      return;
    }

    if (isNaN(taux) || taux < 0 || taux > 100) {
      alert('Veuillez saisir un taux valide entre 0 et 100.');
      return;
    }

    const dataToPatch = {
      NOM_FRAIS: nom,
      POURCENTAGE: taux,
    };

    try {
      if (frais) {
        console.log('Envoi du PATCH avec :', dataToPatch);
        const token = localStorage.getItem('token');
        const id = frais.FRAIS_GLOBAUX_ID;

        console.log('ID du frais :', id);
        try {
          const response = await fetch(`http://localhost:3000/api/fraisC/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(dataToPatch),
          });
          if (!response.ok) {
            const errorData = await response.json();
            await handleApiError(errorData);

            throw new Error(errorData.message || ' Erreur lors de la modification du frais');
          }
          const res = await response.json();
          console.log('Voici la res : ', res);
        } catch (error) {
          console.error('Erreurs update du frais', error);
          throw error;
        }
      } else {
        // logique de création d'un nouveau frais
      }
      // Fermeture du modal
      modal.classList.add('hide');
      document.body.classList.remove('noscroll');

      setTimeout(() => {
        overlay.remove();
        if (modal.parentNode === document.body) {
          document.body.removeChild(modal); // Ferme le modal
        }
      }, 200);

      fetchFraisGlobaux();
    } catch (error) {
      console.error('Erreur lors de la création/modif du frais', error);
    }
  });

  // Append
  main.appendChild(overlay);
  modal.appendChild(modalContent);
  modalContent.append(modalTitle, formCreateFrais, closeBtn);
  tauxFrais.focus();

  // Ecouteur sur le bouton fermer modal

  // Fermer le modal avec la touche Échap
  const handleEscape = e => {
    if (e.key === 'Escape') {
      modal.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
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
    }, 300);
    document.body.classList.remove('noscroll');
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      modal.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
      }, 300);
      document.body.classList.remove('noscroll');
    }
  });
}
