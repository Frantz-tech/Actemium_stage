import { handleApiError } from '../tokenHandler/handleApi.js';

const urlParams = new URLSearchParams(window.location.search);
const devis_id = urlParams.get('devis_id');
const ra_id = urlParams.get('ra_id');
const main = document.querySelector('main');

function regrouperPostes(postes) {
  const postesRegroupés = {};
  postes.forEach(p => {
    const key = `${p.DEVIS_ID}_${p.POSTE_LIBELLE}`;
    if (!postesRegroupés[key]) {
      postesRegroupés[key] = {
        DEVIS_ID: p.DEVIS_ID,
        POSTE_LIBELLE: p.POSTE_LIBELLE,
      };
    }
  });
  console.log(postesRegroupés);

  return Object.values(postesRegroupés);
}

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

        const postesRegroupés = regrouperPostes(postes);
        postesRegroupés.forEach(p => {
          const postContent = document.createElement('div');
          postContent.classList.add('postContent');

          const postItem = document.createElement('div');
          postItem.classList.add('postItem');

          const libelleRef = document.createElement('div');
          libelleRef.classList.add('libelleRef');

          const libelle = document.createElement('p');
          libelle.classList.add('postLibelle');
          libelle.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Libellé : ' })
          );
          libelle.appendChild(document.createTextNode(p.POSTE_LIBELLE));

          const poste_ref = document.createElement('p');
          poste_ref.classList.add('poste_ref');
          poste_ref.appendChild(
            Object.assign(document.createElement('strong'), { textContent: 'Numéro du devis : ' })
          );
          poste_ref.appendChild(document.createTextNode(p.DEVIS_ID));

          const btnOpenPost = document.createElement('div');
          btnOpenPost.textContent = '⎘';
          btnOpenPost.classList.add('btnOpenPost');
          btnOpenPost.addEventListener('click', () => {
            alert(`Ouverture du poste ${p.POSTE_LIBELLE} pour le devis ${p.DEVIS_ID}`);
            // À compléter : logique pour charger les sections/achats/fournitures liés

            const modal = document.createElement('div');
            modal.classList.add('modalPost');
            document.body.classList.add('noscroll');
            modal.style.display = 'flex';
            modal.classList.add('show');

            // Bouton fermeture du modal
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'x';
            closeBtn.classList.add('close-btn');

            // overlay ( blur ) du devis
            const overlay = document.createElement('div');
            overlay.classList.add('modalPost-overlay');

            const modalContent = document.createElement('div');
            modalContent.classList.add('modalPost_content');

            //Libelle du post
            const postLibelle = document.createElement('div');
            postLibelle.textContent = `${p.POST_LIBELLE}`;
            postLibelle.classList.add('modalPostLibelle');
          });

          const btnDeletePost = document.createElement('button');
          btnDeletePost.classList.add('deletebtn');

          btnDeletePost.addEventListener('click', () => {
            const confirmation = confirm(
              `Êtes-vous sûr de vouloir supprimer le poste ? Cette action est irréversible.`
            );
            if (confirmation) {
              // À compléter : fetch delete
            }
          });

          postItem.append(libelleRef);
          libelleRef.append(libelle, poste_ref);
          postContent.append(postItem, btnOpenPost, btnDeletePost);
          postList.appendChild(postContent);
        });

        grpPostList.appendChild(contenuPostList);
        contenuPostList.appendChild(postList);
        main.appendChild(grpPostList);
      }
    })
    .catch(err => {
      console.error('Erreur fetch liste des postes', err);
    });
}
