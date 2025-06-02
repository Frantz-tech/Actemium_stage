import { handleApiError } from '../tokenHandler/handleApi.js';
import { regrouperPostes } from './getpostList.js'; // adapte le chemin si besoin

export async function getPostData(devis_id, ra_id) {
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
    const data_1 = await response.json();
    const postesRegroupés = regrouperPostes(data_1.data);

    console.log('Liste des postes récupérés : ', data_1.data);
    return postesRegroupés;
  } catch (error) {
    console.error('Erreur lors de la récupération des postData : ', error);
  }
}
