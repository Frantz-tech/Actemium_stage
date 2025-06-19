import { handleApiError } from '../tokenHandler/handleApi.js';

export async function patchDevis(devis_id, dataToPatch) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:3000/api/devis/${devis_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(dataToPatch),
    });
    if (!response.ok) {
      const errorData = await response.json();
      await handleApiError(errorData);

      throw new Error(errorData.message || ' Erreur lors de la modification du devis');
    }
    const res = await response.json();

    return res;
  } catch (error) {
    console.error('Erreurs dans devisFap', error);
    throw error;
  }
}
