import { fetchPostList } from '../postes/getpostList.js';

document.querySelector('h1').textContent = 'POSTES';

const main = document.querySelector('main');

const divBtns = document.createElement('div');
divBtns.classList.add('divBtnPoste_fap');

const btnCreerPoste = document.createElement('button');
btnCreerPoste.innerText = 'Créer un poste';
btnCreerPoste.classList.add('btnCreerPoste');
btnCreerPoste.classList.add('btnCreer');

const btnOpenFap = document.createElement('div');
btnOpenFap.style.display = 'none';
btnOpenFap.textContent = 'Ouvrir la Fap';
btnOpenFap.classList.add('btnOpenFap');
btnOpenFap.classList.add('btnCreer');

// Action du btn qui créer un poste
btnCreerPoste.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  if (!devis_id) {
    alert("il manque le devis_id dans l'URL");
    return;
  }
  window.location.href = `../pages/poste.html?devis_id=${devis_id}`;
});

divBtns.append(btnCreerPoste, btnOpenFap);
main.appendChild(divBtns);

fetchPostList();
