document.querySelector('h1').innerText = 'DEVIS';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  console.log('Réponse status :', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur serveur : ${response.status} - ${errorText}`);
  }
  const json = await response.json();
  console.log('Reponse JSON', json);
  return json;
}
async function refreshCmdtSelect() {
  try {
    const response = await fetch('http://localhost:3000/api/commanditaires');
    if (!response.ok) throw new Error('Erreur lors du chargement des commanditaires');
    const data = await response.json();
    const commanditaires = data.data;

    const selectCmdt = document.getElementById('cmdt');
    selectCmdt.innerHTML = ''; // vide le select

    // Ajoute l'option "➕ Ajouter un commanditaire"
    const optionAddNew = new Option('➕ Ajouter un commanditaire', 'add_new');
    optionAddNew.setAttribute('name', 'modal hide');
    selectCmdt.appendChild(optionAddNew);

    if (Array.isArray(commanditaires) && commanditaires.length > 0) {
      commanditaires.forEach(cmdt => {
        const option = new Option(cmdt.NOM, cmdt.CMDT_ID);
        selectCmdt.appendChild(option);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

const btnCreerDevis = document.querySelector('.btnCreer');
btnCreerDevis.innerText = 'Créer';

btnCreerDevis.addEventListener('click', () => {
  window.location.href = '../pages/poste.html';
});

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
        domaineSelect.innerHTML = '<option>Erreur de récupération des domaines</option>';
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

const selectCmdt = document.getElementById('cmdt');

selectCmdt.addEventListener('change', () => {
  const modal = document.getElementById('modalCmdt');
  const modalContent = document.querySelector('.modal_content');

  // Évite d'empiler le contenu à chaque changement
  modalContent.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Nouveau Commanditaire';

  const nomCmdt = document.createElement('input');
  nomCmdt.required = true;
  nomCmdt.placeholder = 'Nom du commanditaire';
  nomCmdt.classList.add('cmdtInputModal');

  const emailCmdt = document.createElement('input');
  emailCmdt.type = 'email';
  emailCmdt.placeholder = 'Email du commanditaire';
  emailCmdt.classList.add('cmdtInputModal');

  const saveCmdtBtn = document.createElement('button');
  saveCmdtBtn.textContent = 'Enregistrer';

  const cancelCmdtBtn = document.createElement('button');
  cancelCmdtBtn.textContent = 'Annuler';

  saveCmdtBtn.addEventListener('click', async e => {
    e.preventDefault();
    if (!nomCmdt.value.trim() || !emailCmdt.value.trim()) {
      alert("Merci de remplir le nom et l'email");
      return;
    }
    try {
      const createdCmdt = await postData('http://localhost:3000/api/commanditaires', {
        NOM: nomCmdt.value,
        EMAIL: emailCmdt.value,
      });

      await refreshCmdtSelect();
      selectCmdt.value = createdCmdt.CMDT_ID;
      modal.classList.add('hide');
    } catch (error) {
      console.error(error);
      console.error("Erreur lors de l'enregistrement du commanditaire : " + error);
    }
  });

  cancelCmdtBtn.addEventListener('click', () => {
    modal.classList.add('hide');
  });

  modalContent.append(title, nomCmdt, emailCmdt, saveCmdtBtn, cancelCmdtBtn);

  if (selectCmdt.value === 'add_new') {
    modal.classList.remove('hide');
  }
});

const allSteps = document.querySelectorAll('select');

// Fonction pour changer l'apparance du select lors du changement dans l'option
allSteps.forEach(select => {
  select.addEventListener('change', () => {
    select.classList.add('valid');
  });
});

fetchClients();
fetchContrats();
fetchExpertises();
fetchDomaines();
fetchCommanditaires();
