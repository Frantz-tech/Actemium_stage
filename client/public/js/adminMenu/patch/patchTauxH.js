import { handleApiError } from '../../tokenHandler/handleApi.js';

export async function patchTauxH(code_id, dataToPatch) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:3000/api/taux/${code_id}`, {
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
      throw new Error(errorData.message || ' Erreur lors de la modification du taux h');
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.error('Erreur dans taux horaire : ', error);
    throw error;
  }
}
