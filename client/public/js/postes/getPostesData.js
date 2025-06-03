import { handleApiError } from '../tokenHandler/handleApi.js';
import { regrouperPostes } from './getpostList.js'; // adapte le chemin si besoin

export async function getPostData(devis_id, ra_id, poste_libelle) {
  const token = localStorage.getItem('token');
  console.log('📤 Appel API avec devis_id =', devis_id, 'et ra_id =', ra_id);
  try {
    const response = await fetch(
      `http://localhost:3000/api/postes?devis_id=${devis_id}&ra_id=${ra_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    if (!response.ok) {
      handleApiError(response);
      throw Error(`Erreur HTTP : ${response.status}`);
    }
    const postes = await response.json();
    const postesRegroupes = regrouperPostes(postes.data);

    console.log('Liste des postes récupérés : ', postes.data);

    // 🔁 Regrouper les postes par POSTE_LIBELLE

    const groupesParLibelle = postes.data.reduce((acc, poste) => {
      const libelle = poste.POSTE_LIBELLE;
      if (!acc[libelle]) acc[libelle] = [];
      acc[libelle].push(poste);
      return acc;
    }, {});

    console.log('📚 Postes regroupés par libellé :', groupesParLibelle);

    return groupesParLibelle;
  } catch (error) {
    console.error('Erreur lors de la récupération des postData : ', error);
  }
}
