import { postData } from './postData.js';

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

// Fonction pour récupérer la liste des clients

function fetchClients() {
  fetch('http://localhost:3000/api/clients')
    .then(response => response.json())
    .then(data => {
      console.log('Clients récupérés : ', data);

      const contratSelect = document.getElementById('clientSegm');
      const clients = data.data;
      if (Array.isArray(clients) && clients.length > 0) {
        clients.forEach(client => {
          const option = document.createElement('option');
          option.value = client.CLIENT_ID;
          option.textContent = `${client.CODE} - ${client.TYPE} `;
          contratSelect.appendChild(option);
        });
      } else {
        contratSelect.innerHTML = '<option> Aucun client trouvé </option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des clients:', error);
      const contratSelect = document.getElementById('contratSegm');
      contratSelect.innerHTML = '<option>Erreur de récupération des clients</option>';
    });
}
function fetchContrats() {
  fetch('http://localhost:3000/api/contrats')
    .then(response => response.json())
    .then(data => {
      console.log('Contrats récupérés : ', data);

      const contratSelect = document.getElementById('contratSegm');
      const contrats = data.data;
      if (Array.isArray(contrats) && contrats.length > 0) {
        contrats.forEach(contrat => {
          const option = document.createElement('option');
          option.value = contrat.CONTRAT_ID;
          option.textContent = `${contrat.CODE} - ${contrat.TYPE}`;
          contratSelect.appendChild(option);
        });
      } else {
        contratSelect.innerHTML = '<option> Aucun contrat trouvé </option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des contrats:', error);
      const contratSelect = document.getElementById('contratSegm');
      contratSelect.innerHTML = '<option>Erreur de récupération des contrats</option>';
    });
}

// Fonction pour récupérer la liste des expertises
function fetchExpertises() {
  fetch('http://localhost:3000/api/expertises')
    .then(response => response.json())
    .then(data => {
      console.log('Expertises récupérées :', data);

      const expertiseSelect = document.getElementById('expertiseSegm');
      const expertises = data.data;
      if (Array.isArray(expertises) && expertises.length > 0) {
        expertises.forEach(expertise => {
          const option = document.createElement('option');
          option.value = expertise.EXP_ID;
          option.textContent = `${expertise.CODE} - ${expertise.TYPE}`;
          expertiseSelect.appendChild(option);
        });
      } else {
        expertiseSelect.innerHTML = '<option>Erreur de récupération des expertises</option>';
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des expertises', error);
      const expertiseSelect = document.getElementById('expertiseSegm');
      expertiseSelect.innerHTML = '<option>Erreur de récupération des expertises</option>';
    });
}
// Fonction pour récupérer la liste des domaines
function fetchDomaines() {
  fetch('http://localhost:3000/api/domaines')
    .then(response => response.json())
    .then(data => {
      console.log('Domaine récupérées :', data);

      const domaineSelect = document.getElementById('domaineSegm');
      const domaines = data.data;
      if (Array.isArray(domaines) && domaines.length > 0) {
        domaines.forEach(domaine => {
          const option = document.createElement('option');
          option.value = domaine.DOMAINE_ID;
          option.textContent = `${domaine.CODE} - ${domaine.TYPE}`;
          domaineSelect.appendChild(option);
        });
      } else {
        domaineSelect.textContent = '<option>Erreur de récupération des domaines</option>';
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des domaines', error);
      const domaineSelect = document.getElementById('domaineSegm');
      domaineSelect.innerHTML = '<option>Erreur de récupération des domaines</option>';
    });
}
function fetchCommanditaires() {
  fetch('http://localhost:3000/api/commanditaires')
    .then(response => response.json())
    .then(data => {
      console.log('Commanditaires récupérées :', data);

      const commanditaireSelect = document.getElementById('cmdt');
      const commanditaires = data.data;
      if (Array.isArray(commanditaires) && commanditaires.length > 0) {
        commanditaires.forEach(commanditaire => {
          const option = document.createElement('option');
          option.value = commanditaire.CMDT_ID;
          option.textContent = `${commanditaire.NOM}`;
          commanditaireSelect.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des commanditaires', error);
      const commanditaireSelect = document.getElementById('cmdt');
      commanditaireSelect.innerHTML = '<option>Erreur de récupération des commanditaires</option>';
    });
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
libelleDevis.style.cursor = 'auto';

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
    inputNameCmdt.style.cursor = 'auto';
    inputNameCmdt.id = 'inputNameCmdt';

    const inputEmailCmdt = document.createElement('input');
    inputEmailCmdt.type = 'email';
    inputEmailCmdt.placeholder = 'Email du commanditaire';
    inputEmailCmdt.style.cursor = 'auto';
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
          document.body.removeChild(modal); // Ferme le modal
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
          document.body.removeChild(modal); // Ferme le modal
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
form.addEventListener('submit', e => {
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
  }

  // Une fois que tout les champs sont rempli =>
  // Fetch POST vers le avec postData pour créer le devis en bdd

  console.log('OK, tous les champs sont bien remplis, on peut envoyer en bdd');
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
