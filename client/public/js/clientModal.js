import { fetchCommanditaires } from './get_devis_segm/getCommanditaire.js';
import { postdatawithfiles } from './post/postData.js';

export async function creerClientModal(client = null) {
  const main = document.querySelector('main');

  const modal = document.createElement('div');
  modal.classList.add('modalClient');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');

  // Bouton fermeture du modal
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  closeBtn.classList.add('close-btn');
  closeBtn.classList.add('close-btnClient');

  // overlay ( blur ) du poste
  const overlay = document.createElement('div');
  overlay.classList.add('modalClient-overlay');
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalClient_content');

  // Modal title
  const modalTitle = document.createElement('h3');
  modalTitle.classList.add('modalTitle');
  modalTitle.textContent = 'Nouveau client';

  const formCreateClient = document.createElement('form');
  formCreateClient.classList.add('formCreateClient');

  // Fieldset pour le nom
  const fsNomClient = document.createElement('fieldset');
  fsNomClient.classList.add('fsClient');

  // label pour le nom
  const labelNomClient = document.createElement('label');
  labelNomClient.classList.add('labelModalClient');
  labelNomClient.textContent = 'Nom du commanditaire';
  labelNomClient.htmlFor = 'nomClient';

  // Input pour le nom
  const nomClient = document.createElement('input');
  nomClient.id = 'nomClient';
  nomClient.classList.add('nomClientModal');
  nomClient.placeholder = 'Nom';
  nomClient.required = true;

  // Fieldset pour l'email
  const fsEmailClient = document.createElement('fieldset');
  fsEmailClient.classList.add('fsClient');

  // Label pour l'email
  const labelEmailClient = document.createElement('label');
  labelEmailClient.classList.add('labelModalClient');
  labelEmailClient.textContent = 'Email du client';
  labelEmailClient.htmlFor = 'emailClient';

  // Input pour l'email
  const emailClient = document.createElement('input');
  emailClient.id = 'emailClient';
  emailClient.classList.add('emailClientModal');
  emailClient.placeholder = 'Email';
  emailClient.required = true;

  // FieldSet pour le logo
  const fsLogoClient = document.createElement('fieldset');
  fsLogoClient.classList.add('fsClient');

  // Label pour le logo
  const labelLogoClient = document.createElement('label');
  labelLogoClient.classList.add('labelModalClient');
  labelLogoClient.textContent = 'Logo du commanditaire';
  labelLogoClient.htmlFor = 'logoClient';

  // Input pour le logo
  const logoClient = document.createElement('input');
  logoClient.setAttribute('name', 'logo');
  logoClient.id = 'logoClient';
  logoClient.type = 'file';
  logoClient.classList.add('logoClientModal');
  logoClient.required = false;

  // Btn créer le client
  const btnCreer = document.createElement('button');
  btnCreer.type = 'submit';
  btnCreer.classList.add('btnCreer');
  btnCreer.textContent = 'Créer';

  if (client) {
    btnCreer.textContent = 'Modifier';
    nomClient.value = client.NOM;
    emailClient.value = client.EMAIL;
    // pas possible de pré-remplir le champ file input pour le logo.
  } else {
    btnCreer.textContent = 'Créer';
  }

  // Event sur le bouton créer un commanditaire
  btnCreer.addEventListener('click', async e => {
    e.preventDefault();
    const nom = document.getElementById('nomClient').value.trim();
    const email = document.getElementById('emailClient').value.trim();
    const file = document.getElementById('logoClient').files[0];
    if (!email || !nom) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    // Crée un objet avec les données du formulaire
    const data = {
      NOM: nom,
      EMAIL: email,
    };
    const files = {
      logo: file,
    };

    try {
      if (client) {
        await postdatawithfiles(
          `http://localhost:3000/api/commanditaires/${client.CMDT_ID}`,
          data,
          files,
          'PATCH'
        );
      } else {
        await postdatawithfiles(`http://localhost:3000/api/commanditaires`, data, files);
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

      fetchCommanditaires();
    } catch (error) {
      console.error('Erreur lors de la création/modif du commanditaire', error);
    }
  });

  main.appendChild(overlay);
  overlay.appendChild(modal);
  modal.appendChild(modalContent);
  modalContent.append(modalTitle, formCreateClient, closeBtn);
  fsNomClient.append(labelNomClient, nomClient);
  fsEmailClient.append(labelEmailClient, emailClient);
  fsLogoClient.append(labelLogoClient, logoClient);
  formCreateClient.append(fsNomClient, fsEmailClient, fsLogoClient, btnCreer);
  nomClient.focus();

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
