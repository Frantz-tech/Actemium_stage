import { handleApiError } from '../tokenHandler/handleApi.js';

const urlParams = new URLSearchParams(window.location.search);
const devis_id = urlParams.get('devis_id');
const ra_id = urlParams.get('ra_id');

export function fetchPostList() {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/api/postes?devis_id=${devis_id}&ra_id=${ra_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
    .then(res => res.json())
    .then(data => {
      handleApiError(data);
      console.log('Liste des postes reçu : ', data);

      const postes = data.data;

      if (Array.isArray(postes) && postes.length > 0) {
        const grpPostList = document.createElement('div');
        grpPostList.id = 'groupePostList';

        const contenuPostList = document.createElement('div');
        contenuPostList.classList.add('contenuPostList');

        const postList = document.createElement('div');
        postList.id = 'postList';
        postes.forEach(p => {
          // Parent de postItem et les boutons
          const postContent = document.createElement('div');
          postContent.classList.add('postContent');

          // Contenu du poste
          const postItem = document.createElement('div');
          postItem.classList.add('postItem');

          // Libelle et ref du poste
          const libelleRef = document.createElement('div');
          libelleRef.classList.add('libelleRef');

          // Libelle du poste
          const libelle = document.createElement('p');
          libelle.classList.add('postLibelle');
          libelle.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Libellé : ' })
          );
          libelle.appendChild(document.createTextNode(p.POSTE_LIBELLE));

          // Numéro du devis
          const poste_ref = document.createElement('p');
          poste_ref.classList.add('poste_ref');
          poste_ref.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Numéro du devis : ' })
          );
          poste_ref.appendChild(document.createTextNode(p.DEVIS_ID));
        });
      }
    })
    .catch(err => {
      console.error('Erreur fetch liste des postes', err);
    });
}
