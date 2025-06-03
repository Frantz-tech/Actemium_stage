import { fetchClients } from './get_devis_segm/getClients.js';
import { fetchCommanditaires } from './get_devis_segm/getCommanditaire.js';
import { fetchContrats } from './get_devis_segm/getContrats.js';
import { fetchDomaines } from './get_devis_segm/getDomines.js';
import { fetchExpertises } from './get_devis_segm/getExpertises.js';
import { postData } from './post/postData.js';

document.querySelector('h1').innerText = 'DEVIS';

// Récupérer le RA_ID depuis localStorage
const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
const ra_id = utilisateur?.RA_ID;

async function refreshCmdtSelect(selectedId = null) {
  try {
    const response = await fetch('http://localhost:3000/api/commanditaires');
    if (!response.ok) throw new Error('Erreur lors du chargement des commanditaires');
    const data = await response.json();
    const commanditaires = data.data;

    const selectCmdt = document.getElementById('cmdt');
    selectCmdt.innerHTML = '';

    const defaultOption = new Option('COMMANDITAIRE', 'commanditaire', true, true);
    defaultOption.disabled = true;
    selectCmdt.appendChild(defaultOption);

    const optionAddNew = new Option('➕ Ajouter un commanditaire', 'add_new');
    selectCmdt.appendChild(optionAddNew);

    if (Array.isArray(commanditaires) && commanditaires.length > 0) {
      commanditaires.forEach(cmdt => {
        const option = new Option(cmdt.NOM, cmdt.CMDT_ID);
        selectCmdt.appendChild(option);
      });
    }

    // Map => Parcour la liste de tout les ID du select
    console.log(
      'Options dans le select :',
      [...selectCmdt.options].map(o => o.value)
    );
    console.log('selectedId attendu:', selectedId);
    alert('Commanditaire ajouté avec succès');

    if (selectedId) {
      selectCmdt.value = selectedId;
      if (selectCmdt.value !== selectedId) {
        const optionToSelect = [...selectCmdt.options].find(o => o.value === selectedId);
        if (optionToSelect) {
          optionToSelect.selected = true;
        } else {
          console.warn('L’option avec cet ID n’a pas été trouvée dans le select.');
        }
      }
      console.log('Valeur finale du select:', selectCmdt.value);
    }
  } catch (error) {
    console.error(error);
  }
}

// Création du formulaire de devis

const containerForm = document.createElement('div');
containerForm.classList.add('containerFormDevis');
const form = document.createElement('form');
form.classList.add('createDevisForm');

const libelleDevis = document.createElement('input');
libelleDevis.id = 'libelleDevis';
libelleDevis.placeholder = 'LIBELLE DU DEVIS';
libelleDevis.type = 'text';
libelleDevis.required = true;

const raId = document.createElement('input');
raId.id = 'raId';
raId.type = 'text';
raId.readOnly = true;

raId.value = ra_id;

const selectCmdt = document.createElement('select');
selectCmdt.id = 'cmdt';

const defaultOption = document.createElement('option');
defaultOption.value = 'commanditaire';
defaultOption.disabled = true;
defaultOption.selected = true;
defaultOption.textContent = 'COMMANDITAIRE';

const optionAddNew = document.createElement('option');
optionAddNew.value = 'add_new';
optionAddNew.textContent = '➕ Ajouter un commanditaire';

// Création du modal lors du clique sur la 'add_new'

selectCmdt.addEventListener('change', () => {
  if (selectCmdt.value === 'add_new') {
    const modal = document.createElement('div');
    modal.classList.add('modalCmdt');
    modal.classList.add('show');
    document.body.classList.add('noscroll');
    modal.style.display = 'flex';
    modal.classList.add('show');

    const overlay = document.createElement('div');
    overlay.classList.add('modalCmdt-overlay');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modalCmdt_content');

    const form = document.createElement('form');
    form.classList.add('newCmdtForm');

    const inputNameCmdt = document.createElement('input');
    inputNameCmdt.type = 'text';
    inputNameCmdt.placeholder = 'Nom du commanditaire';
    inputNameCmdt.id = 'inputNameCmdt';

    const inputEmailCmdt = document.createElement('input');
    inputEmailCmdt.type = 'email';
    inputEmailCmdt.placeholder = 'Email du commanditaire';
    inputEmailCmdt.focus();
    inputEmailCmdt.id = 'inputEmailCmdt';

    // Ajout du bouton creer un commanditaire
    const sumbitNewCmdt = document.createElement('button');
    sumbitNewCmdt.classList.add('createNewCmdtSubmit');
    sumbitNewCmdt.textContent = 'Ajouter';

    // Event sur le bouton créer un commanditaire
    sumbitNewCmdt.addEventListener('click', async e => {
      e.preventDefault();

      const nom = document.getElementById('inputNameCmdt').value.trim();
      const email = document.getElementById('inputEmailCmdt').value.trim();

      if (!email || !nom) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      // Crée un objet avec les données du formulaire
      const userData = {
        NOM: nom,
        EMAIL: email,
      };
      try {
        const createCmdt = await postData('http://localhost:3000/api/commanditaires', userData);

        await refreshCmdtSelect(createCmdt.data);

        // Fermeture du modal
        modal.classList.add('hide');
        document.body.classList.remove('noscroll');

        setTimeout(() => {
          overlay.remove();
          if (modal.parentNode === document.body) {
            document.body.removeChild(modal); // Ferme le modal
          }
        }, 200);
      } catch (error) {
        console.error('Erreur lors de la création du commanditaire', error);
      }
    });

    // Ajout bouton annuler
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelUserBtn');
    cancelBtn.textContent = 'Annuler';

    // Event sur le button cancel
    cancelBtn.addEventListener(
      'click',
      e => {
        e.preventDefault();
        modal.classList.add('hide');
        document.body.classList.remove('noscroll');

        setTimeout(() => {
          overlay.remove();
          if (modal.parentNode === document.body) {
            document.body.removeChild(modal); // Ferme le modal
          }
        }, 200);
        const firstCmdtOption = [...selectCmdt.options].find(opt => opt.value !== 'add_new');
        if (firstCmdtOption) {
          selectCmdt.value = firstCmdtOption.value;
        }
      },
      { once: true }
    );

    const divBtn = document.createElement('div');
    divBtn.classList.add('divBtnModal');
    divBtn.append(sumbitNewCmdt, cancelBtn);
    form.append(inputNameCmdt, inputEmailCmdt, divBtn);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }
});

const clientSegm = document.createElement('select');
clientSegm.required = true;
clientSegm.id = 'clientSegm';
const optionClientSegm = document.createElement('option');
optionClientSegm.textContent = 'CLIENT';
optionClientSegm.selected = true;
optionClientSegm.disabled = true;

const expertiseSegm = document.createElement('select');
expertiseSegm.required = true;
expertiseSegm.id = 'expertiseSegm';
const optionExpertiseSegm = document.createElement('option');
optionExpertiseSegm.textContent = 'EXPERTISE';
optionExpertiseSegm.selected = true;
optionExpertiseSegm.disabled = true;

const domaineSegm = document.createElement('select');
domaineSegm.required = true;
domaineSegm.id = 'domaineSegm';
const optionDomaineSegm = document.createElement('option');
optionDomaineSegm.textContent = 'DOMAINE';
optionDomaineSegm.selected = true;
optionDomaineSegm.disabled = true;

const contratSegm = document.createElement('select');
contratSegm.required = true;
contratSegm.id = 'contratSegm';
const optionContratSegm = document.createElement('option');
optionContratSegm.textContent = 'CONTRAT';
optionContratSegm.selected = true;
optionContratSegm.disabled = true;

const btnCreer = document.createElement('button');
btnCreer.type = 'submit';
btnCreer.classList.add('btnCreer');
btnCreer.textContent = 'Créer';

// Event sur le button btnCreer
form.addEventListener('submit', async e => {
  e.preventDefault();

  const inputLibelle = document.getElementById('libelleDevis');
  const libelle = inputLibelle.value.trim();

  const selectCmdt = document.getElementById('cmdt');
  const clientSegm = document.getElementById('clientSegm');
  const expertiseSegm = document.getElementById('expertiseSegm');
  const domaineSegm = document.getElementById('domaineSegm');
  const contratSegm = document.getElementById('contratSegm');

  if (
    !libelle ||
    selectCmdt.value === 'commanditaire' ||
    selectCmdt.value === 'add_new' ||
    clientSegm.value === 'CLIENT' ||
    contratSegm.value === 'CONTRAT' ||
    domaineSegm.value === 'DOMAINE' ||
    expertiseSegm.value === 'EXPERTISE'
  ) {
    alert('Merci de bien remplir tous les champs');
    return;
  }

  // Crée un objet avec les valeurs des options sélectionnées
  const devisData = {
    LIBELLE: libelle,
    RA_ID: ra_id,
    CMDT_ID: selectCmdt.value,
    CLIENT_ID: clientSegm.value,
    DOM_ID: domaineSegm.value,
    EXP_ID: expertiseSegm.value,
    CONTRAT_ID: contratSegm.value,
  };
  console.log('ID envoyés :', devisData);
  try {
    const createDevis = await postData('http://localhost:3000/api/devis', devisData);
    if (createDevis.errors) {
      alert('Erreurs : ' + createDevis.errors.join(','));
      return;
    }
    alert(`✅ Devis ${devisData.LIBELLE} crée avec succès`);

    window.location.href = '../pages/devisList.html';
  } catch (error) {
    console.error('Erreur lors de la création du devis', error);
  }
});

// Append && AppendChild
const main = document.querySelector('main');
main.appendChild(containerForm);
containerForm.appendChild(form);
selectCmdt.append(defaultOption, optionAddNew);
clientSegm.appendChild(optionClientSegm);
expertiseSegm.appendChild(optionExpertiseSegm);
domaineSegm.appendChild(optionDomaineSegm);
contratSegm.appendChild(optionContratSegm);
form.append(
  libelleDevis,
  raId,
  selectCmdt,
  clientSegm,
  expertiseSegm,
  domaineSegm,
  contratSegm,
  btnCreer
);

fetchClients();
fetchContrats();
fetchExpertises();
fetchDomaines();
fetchCommanditaires();
