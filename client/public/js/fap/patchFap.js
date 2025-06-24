import { handleApiError } from '../tokenHandler/handleApi.js';

export async function patchFap(devis_id, dataToPatch) {
  try {
    const response = await fetch(`http://localhost:3000/api/fap/${devis_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPatch),
    });
    if (!response.ok) {
      const errorData = await response.json();
      await handleApiError(errorData);

      throw new Error(errorData.message || ' Erreur lors de la modification de la FAP');
    }
    const res = await response.json();

    return res;
  } catch (error) {
    console.error('Erreurs dans patchFap', error);
    throw error;
  }
}
