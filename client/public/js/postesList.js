import { fetchPostList } from './postes/getpostList.js';

document.querySelector('h1').textContent = 'POSTES';

// const btnCreerFap = document.createElement('button');
// btnCreerFap.textContent = 'Générer FAP';
// btnCreerFap.classList.add('btnCreerFap');
// btnCreerFap.classList.add('btnCreer');

// btnCreerFap.addEventListener('click', () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const devis_id = urlParams.get('devis_id');
//   const ra_id = urlParams.get('ra_id');
//   if (!devis_id || !ra_id) {
//     alert("il manque le devis_id ou le ra_id dans l'URL");
//     return;
//   }
//   window.location.href = `../pages/fap.html?devis_id=${devis_id}&ra_id=${ra_id}`;
// });

// btnPostes.appendChild(btnCreerPoste);

// Creation de la liste des postes :
fetchPostList();
