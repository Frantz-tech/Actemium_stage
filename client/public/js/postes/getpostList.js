import { handleApiError } from '../tokenHandler/handleApi.js';
import { deletePost } from './deletePoste.js';
import { openPostModal } from './openPostModal.js';

const urlParams = new URLSearchParams(window.location.search);
const devis_id = urlParams.get('devis_id');
const ra_id = urlParams.get('ra_id');
const main = document.querySelector('main');

export function regrouperPostes(postes) {
  const postesRegroupés = {};
  postes.forEach(p => {
    const key = `${p.DEVIS_ID}_${p.POSTE_LIBELLE}`;
    if (!postesRegroupés[key]) {
      postesRegroupés[key] = { ...p };
    } else {
      // fusionner les tableaux si existants
      postesRegroupés[key].section = [
        ...(postesRegroupés[key].section || []),
        ...(p.section || []),
      ];
      postesRegroupés[key].achats = [...(postesRegroupés[key].achats || []), ...(p.achats || [])];
      postesRegroupés[key].fournitures = [
        ...(postesRegroupés[key].fournitures || []),
        ...(p.fournitures || []),
      ];
    }
  });
  console.log('listes des postes groupés : ', postesRegroupés);

  return Object.values(postesRegroupés);
}

export function fetchPostList() {
  const existList = document.getElementById('groupePostList');
  if (existList) {
    existList.remove();
  }

  // const existBtnCreer = document.querySelector('.btnCreer');
  // if (existBtnCreer) {
  //   existBtnCreer.remove();
  // }
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
            Object.assign(document.createElement('strong'), { textContent: 'Devis N° : ' })
          );
          poste_ref.appendChild(document.createTextNode(p.DEVIS_ID));

          const btnDeletePost = document.createElement('button');
          btnDeletePost.classList.add('deletebtn');

          postItem.addEventListener('click', () => {
            console.log(`Ouverture du poste ${p.POSTE_LIBELLE} pour le devis ${p.DEVIS_ID}`);
            openPostModal(p, postes);
          });

          // Supprimer un poste

          btnDeletePost.addEventListener('click', async () => {
            const confirmation = confirm(
              `Êtes-vous sûr de vouloir supprimer le poste ? Cette action est irréversible.`
            );
            if (confirmation) {
              try {
                await deletePost(p.DEVIS_ID, p.POSTE_LIBELLE);
                fetchPostList();
              } catch (error) {
                console.error(`Erreur lors de la suppression du poste : ${devis_id}`, error);
                throw error;
              }
            }
          });

          postItem.append(libelleRef);
          libelleRef.append(libelle, poste_ref);
          postList.appendChild(postContent);
          postContent.append(postItem, btnDeletePost);
        });

        main.appendChild(grpPostList);
        grpPostList.appendChild(contenuPostList);
        contenuPostList.appendChild(postList);

        const btnOpenFap = document.querySelector('.btnOpenFap');
        if (postesRegroupés.length > 0) {
          if (btnOpenFap) {
            btnOpenFap.style.display = 'flex';
          }

          // Action du bouton qui génère la FAP

          btnOpenFap.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const devis_id = urlParams.get('devis_id');
            const ra_id = urlParams.get('ra_id');
            if (!devis_id || !ra_id) {
              alert("il manque le devis_id ou le ra_id dans l'URL");
              return;
            }
            window.location.href = `../pages/fap.html?devis_id=${devis_id}&ra_id=${ra_id}`;
          });
        } else {
          btnOpenFap.style.display = 'none';
        }
      }
    })

    .catch(err => {
      console.error('Erreur fetch liste des postes', err);
    });
}
