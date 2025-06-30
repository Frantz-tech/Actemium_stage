import { fetchTauxH } from '../../postes/getTauxH.js';
import { patchTauxH } from '../patch/patchTauxH.js';

export async function modalTauxHAdmin(taux = null) {
  const main = document.querySelector('main');

  const modal = document.createElement('div');
  modal.classList.add('modalTauxH');
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
  overlay.classList.add('modalTauxH-overlay');
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalTauxH_content');

  // Modal title
  const modalTitle = document.createElement('h3');
  modalTitle.classList.add('modalTitle');
  modalTitle.textContent = 'Nouveau taux';

  const formCreateTauxH = document.createElement('form');
  formCreateTauxH.classList.add('formCreateTauxH');

  // Fieldset pour le nom
  const fsNomTauxH = document.createElement('fieldset');
  fsNomTauxH.classList.add('fsTauxH');

  // label pour le nom
  const labelNomTauxH = document.createElement('label');
  labelNomTauxH.classList.add('labelModalFrais');
  labelNomTauxH.textContent = 'Libellé';
  labelNomTauxH.htmlFor = 'nomTauxH';

  // Input pour le libellé
  const nomTauxH = document.createElement('input');
  nomTauxH.id = 'nomTauxH';
  nomTauxH.classList.add('nomTauxHModal');
  nomTauxH.placeholder = 'Libellé';
  nomTauxH.required = true;

  // Fieldset pour le taux
  const fsTauxH = document.createElement('fieldset');
  fsTauxH.classList.add('fsTauxH');

  // Label pour le taux
  const labelTauxH = document.createElement('label');
  labelTauxH.classList.add('labelTauxFrais');
  labelTauxH.textContent = 'Taux';
  labelTauxH.htmlFor = 'tauxH';

  // Input pour le taux
  const tauxH = document.createElement('input');
  tauxH.id = 'tauxH';
  tauxH.classList.add('tauxH');
  tauxH.placeholder = 'Taux horaire € / H';
  tauxH.required = true;

  // Fieldset pour l'année
  const fsYearFrais = document.createElement('fieldset');
  fsYearFrais.classList.add('fsTauxH');

  // Label pour l'année
  const labelYearFrais = document.createElement('label');
  labelYearFrais.classList.add('labelYearFrais');
  labelYearFrais.textContent = 'Année';
  labelYearFrais.htmlFor = 'yearFrais';

  // Input pour le taux
  const year = document.createElement('input');
  year.id = 'year';
  year.classList.add('yearFrais');
  year.placeholder = 'Taux horaire €';
  year.required = true;

  // Btn créer le taux
  const btnCreer = document.createElement('button');
  btnCreer.type = 'submit';
  btnCreer.classList.add('btnCreer');
  btnCreer.textContent = 'Créer';

  if (taux) {
    modalTitle.textContent = 'Update taux horaire';
    btnCreer.textContent = 'Modifier';
    nomTauxH.value = `${taux.LIBELLE}`;
    tauxH.value = `${taux.TAUX}`;
    year.value = `${taux.ANNEE}`;
    nomTauxH.disabled = true;
  } else {
    btnCreer.textContent = 'Créer';
  }

  fsNomTauxH.append(labelNomTauxH, nomTauxH);
  fsTauxH.append(labelTauxH, tauxH);
  fsYearFrais.append(labelYearFrais, year);
  formCreateTauxH.append(fsNomTauxH, fsTauxH, fsYearFrais, btnCreer);

  formCreateTauxH.addEventListener('submit', async e => {
    e.preventDefault();

    const tauxValue = document.getElementById('tauxH').value.trim().replace('%', '');
    const annee = document.getElementById('year').value.trim();

    if (isNaN(tauxValue) || tauxValue < 0) {
      alert('Veuillez saisir un taux horaire supérieur à 0 ');
      return;
    }
    if (isNaN(annee) || annee.length !== 4) {
      alert('Veuillez saisir un année au format YYYY');
    }

    const dataToPatch = {
      TAUX: tauxValue,
      ANNEE: annee,
      CODE_ID: taux.CODE_ID,
    };

    try {
      if (taux) {
        console.log('Envoi du PATCH avec :', dataToPatch);
        // const token = localStorage.getItem('token');
        const id = taux.CODE_ID;

        console.log('Id du taux à modifier : ', id);

        try {
          const response = await patchTauxH(id, dataToPatch);
          console.log('Voici la res du patch :', response);
        } catch (error) {
          console.error('Erreur update du taux', error);
          throw error;
        }
      } else {
        // Logique de la créatino d'un nouveau taux
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
      fetchTauxH();
    } catch (error) {
      console.error('Erreur lors de la création/modification du taux', error);
    }
  });

  // Append
  main.appendChild(overlay);
  modal.appendChild(modalContent);
  modalContent.append(modalTitle, formCreateTauxH, closeBtn);
  tauxH.focus();

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
