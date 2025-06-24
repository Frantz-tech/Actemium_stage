import { handleApiError } from '../../tokenHandler/handleApi.js';

export async function getDetailPostData(devis_id, ra_id) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `http://localhost:3000/api/postesDetail?devis_id=${devis_id}&ra_id=${ra_id}`,
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
    }

    const postes = await response.json();
    console.log('Detail des postes: ', postes);

    // Regrouper les postes par CONTEXT

    const groupeParContext = postes.data.reduce((acc, poste) => {
      const ctx = poste.CONTEXT;
      if (!acc[ctx]) acc[ctx] = [];
      acc[ctx].push(poste);
      return acc;
    }, {});

    return groupeParContext;
  } catch (error) {
    console.error('Erreur lors de la récupération du détail des postes ');
    throw Error('Erreur lros de la récupération du détail des postes:', error);
  }
}
