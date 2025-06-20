import { handleApiError } from '../tokenHandler/handleApi.js';

export async function getDevisByCmdtId(cmdt_id) {
  const token = localStorage.getItem('token');
  try {
    console.log(`Appel API : http://localhost:3000/api/devis/dCmdt/${cmdt_id}`);

    const response = await fetch(`http://localhost:3000/api/devis/dCmdt/${cmdt_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      handleApiError(response);
      return;
    }
    const devis = await response.json();
    console.log('Données getDevisCmdt : ', devis);

    return devis;
  } catch (error) {
    console.error('Erreur lors de la récupération du devis ', error);
    throw error;
  }
}
