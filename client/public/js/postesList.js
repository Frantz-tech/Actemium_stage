import { fetchPostList } from './postes/getpostList.js';

document.querySelector('h1').textContent = 'POSTES';

const btnPostes = document.createElement('div');
btnPostes.classList.add('btnPostes');

const main = document.querySelector('main');
main.appendChild(btnPostes);

const btnCreerPoste = document.createElement('button');
btnCreerPoste.innerText = 'Créer un poste';
btnCreerPoste.classList.add('btnCreerPoste');
btnCreerPoste.classList.add('btnCreer');

// Action du btn qui créer un poste
btnCreerPoste.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  const ra_id = urlParams.get('ra_id');
  if (!devis_id || !ra_id) {
    alert("il manque le devis_id ou le ra_id dans l'URL");
    return;
  }
  window.location.href = `../pages/poste.html?devis_id=${devis_id}&ra_id=${ra_id}`;
});

const btnCreerFap = document.createElement('button');
btnCreerFap.textContent = 'Générer FAP';
btnCreerFap.classList.add('btnCreerFap');
btnCreerFap.classList.add('btnCreer');

// Action du bouton qui génère la FAP
btnCreerFap.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  const ra_id = urlParams.get('ra_id');
  if (!devis_id || !ra_id) {
    alert("il manque le devis_id ou le ra_id dans l'URL");
    return;
  }
  window.location.href = `../pages/fap.html?devis_id=${devis_id}&ra_id=${ra_id}`;
});

btnPostes.append(btnCreerFap, btnCreerPoste);

// Creation de la liste des postes :

fetchPostList();
