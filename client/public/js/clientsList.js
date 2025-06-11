import { fetchCommanditaires } from './get_devis_segm/getCommanditaire.js';

document.querySelector('h1').innerText = 'CLIENTS';

const main = document.querySelector('main');

const btnCreerClient = document.createElement('button');
btnCreerClient.innerText = 'Créer un client';
btnCreerClient.classList.add('btnCreerClient');
btnCreerClient.classList.add('btnCreer');

// Action du btn qui créer un client
btnCreerClient.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ra_id = urlParams.get('ra_id');
  if (!ra_id) {
    alert("il manque ou le ra_id dans l'URL");
    return;
  }
  // Faire la fonction openModalCreateCmdt()
});

main.appendChild(btnCreerClient);

fetchCommanditaires();
