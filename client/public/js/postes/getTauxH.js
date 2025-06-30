import { tauxHList } from '../lists/tauxHList.js';
import { handleApiError } from '../tokenHandler/handleApi.js';

export async function fetchTauxH(context = 'main_doeuvre') {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:3000/api/sections?context=${context}`, {
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

    const tauxH = await response.json();

    const urlParams = window.location.pathname;

    if (urlParams.includes('/adminDashboard')) {
      console.log('Taux horaire : ', tauxH);

      tauxHList(tauxH.data);

      // On récupère l'année du taux du RA : [0] pour l'afficher dans le titre
      document.querySelector('h2').textContent =
        `Liste des Taux Horaires ( ${tauxH.data[0].ANNEE} )`;
    }

    return tauxH;
  } catch (error) {
    console.error('Erreur lors de la récupération des taux/horaires', error);
    throw Error('Erreur lors de la récupération des taux horaires');
  }
}
