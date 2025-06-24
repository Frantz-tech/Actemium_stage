import { handleApiError } from '../../tokenHandler/handleApi.js';

export async function getFapData(devis_id) {
  const token = localStorage.getItem('token');

  try {
    console.log(`Appel API : http://localhost:3000/api/fap/${devis_id}`);

    const response = await fetch(`http://localhost:3000/api/fap/${devis_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      await handleApiError(response);
    }

    const fap = await response.json();

    return fap;
  } catch (error) {
    console.error('Erreur lors de la récupération de la FAP ', error);
    throw error;
  }
}
