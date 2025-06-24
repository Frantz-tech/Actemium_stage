import { fraisList } from '../../lists/fraisList.js';
import { handleApiError } from '../../tokenHandler/handleApi.js';

export async function fetchFraisGlobaux() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:3000/api/fraisC`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      handleApiError(response);
      throw Error(`Erreur HTTP: ${response.status}`);
    }

    const fraisGlobaux = await response.json();

    const urlParams = window.location.pathname;

    if (urlParams.includes('/fap')) {
      const tauxFrais = Object.fromEntries(
        fraisGlobaux.data.map(f => [f.NOM_FRAIS, parseFloat(f.POURCENTAGE) / 100])
      );
      return tauxFrais;
    }

    if (urlParams.includes('/adminDashboard')) {
      console.log('Liste des frais récups : ', fraisGlobaux);
      fraisList(fraisGlobaux.data);
      document.querySelector('h2').textContent = 'Liste des Frais';

      return fraisGlobaux;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des frais, :', error);
    throw Error('Erreur lors de la récupération des frais');
  }
}
