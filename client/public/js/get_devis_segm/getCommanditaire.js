import { deleteClient } from '../delete/deleteClient.js';
import { handleApiError } from '../tokenHandler/handleApi.js';

export function fetchCommanditaires() {
  fetch('http://localhost:3000/api/commanditaires')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Commanditaires récupérées :', data);

      const commanditaireSelect = document.getElementById('cmdt');
      const commanditaires = data.data;

      const urlCheck = window.location.pathname;

      if (
        urlCheck.includes('/devis') &&
        Array.isArray(commanditaires) &&
        commanditaires.length > 0
      ) {
        commanditaires.forEach(commanditaire => {
          const option = document.createElement('option');
          option.value = commanditaire.CMDT_ID;
          option.textContent = `${commanditaire.NOM}`;
          commanditaireSelect.appendChild(option);
        });
      }

      if (
        urlCheck.includes('/clients') &&
        Array.isArray(commanditaires) &&
        commanditaires.length > 0
      ) {
        const grpClientList = document.createElement('div');
        grpClientList.id = 'groupeClientList';

        const contenuClientList = document.createElement('div');
        contenuClientList.classList.add('contenuClientList');

        const clientList = document.createElement('div');
        clientList.id = 'clientList';

        commanditaires.forEach(c => {
          c.NOM = c.NOM.toUpperCase();
          // Parent de client Item et les boutons
          const clientContent = document.createElement('div');
          clientContent.classList.add('clientContent');

          const clientItem = document.createElement('div');
          clientItem.classList.add('clientItem');

          const clientInfo = document.createElement('div');
          clientInfo.classList.add('clientInfo');

          const nomClient = document.createElement('p');
          nomClient.classList.add('nomClient');
          nomClient.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Nom : ' })
          );
          nomClient.appendChild(document.createTextNode(c.NOM));

          const emailClient = document.createElement('p');
          emailClient.classList.add('emailClient');
          emailClient.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Email : ' })
          );
          emailClient.appendChild(document.createTextNode(c.EMAIL));

          const clientLogo = document.createElement('div');
          clientLogo.classList.add('clientLogo');

          // Image du client
          const logoImg = document.createElement('img');

          // SI on a mit un logo :
          if (c.LOGO) {
            logoImg.src = '../assets/logo.png'; // A remplacer par la suite par `http://localhost:3000/api/upload/${c.LOGO}
          } else {
            logoImg.src = '../assets/placeholderLogo.png';
          }
          logoImg.alt = 'Logo Client';

          // Ajout de l'image dans le div
          clientLogo.appendChild(logoImg);

          const btnUpdateClient = document.createElement('div');
          btnUpdateClient.id = 'btnUpdateClient';
          btnUpdateClient.textContent = '✎';

          const btnDeleteClient = document.createElement('button');
          btnDeleteClient.classList.add('deletebtn');

          btnDeleteClient.addEventListener('click', async () => {
            const confirmation = confirm(
              `Êtes-vous sur de vouloir supprimer le client ? Cette action est irréversible`
            );
            if (confirmation) {
              try {
                await deleteClient();
                fetchCommanditaires();
              } catch (error) {
                console.error(`Erreur lors de la suppression du client`, error.message);
                throw error;
              }
            }
          });

          clientInfo.append(nomClient, emailClient);
          clientItem.append(clientInfo, clientLogo);
          clientContent.append(btnUpdateClient, clientItem, btnDeleteClient);
          clientList.appendChild(clientContent);
          contenuClientList.appendChild(clientList);
          grpClientList.appendChild(contenuClientList);
          const main = document.querySelector('main');
          main.appendChild(grpClientList);
        });
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des commanditaires', error);
      const commanditaireSelect = document.getElementById('cmdt');
      commanditaireSelect.innerHTML = '<option>Erreur de récupération des commanditaires</option>';
    });
}
