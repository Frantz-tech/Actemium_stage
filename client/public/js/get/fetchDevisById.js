import { handleApiError } from '../tokenHandler/handleApi.js';

export async function getDevisById(devis_id) {
  const token = localStorage.getItem('token');
  try {
    console.log(`Appel API : http://localhost:3000/api/devis/${devis_id}`);

    const response = await fetch(`http://localhost:3000/api/devis/${devis_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      handleApiError(response);
    }
    const devis = await response.json();

    return devis;
  } catch (error) {
    console.error('Erreur lors de la récupération du devis ', error);
    throw error;
  }
}
