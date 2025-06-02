import { getPostData } from '../postes/getPostesData.js';

export async function fetchFap() {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  const ra_id = urlParams.get('ra_id');

  try {
    const postes = await getPostData(devis_id, ra_id);

    const contenuPost = document.createElement('div');
    contenuPost.id = 'contenuPost';

    let totalPostFap = 0;
    postes.forEach(p => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('postDiv');

      const postLibelleFap = document.createElement('p');
      postLibelleFap.classList.add('postLibelleFap');
      postLibelleFap.textContent = `Libellé : ${p.POSTE_LIBELLE}`;

      totalPostFap = document.createElement('div');
      totalPostFap.classList.add('totalPostFap');
      totalPostFap.textContent += `Montant : ${parseFloat(p.TOTAL || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

      postDiv.append(postLibelleFap, totalPostFap);
      contenuPost.appendChild(postDiv);
    });
    const main = document.querySelector('main');
    main.appendChild(contenuPost);
  } catch (error) {
    console.error('Erreur lors de la récupération des postes :', error);
  }
}
