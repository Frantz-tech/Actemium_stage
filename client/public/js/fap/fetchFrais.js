import { handleApiError } from '../tokenHandler/handleApi.js';

export async function fetchFraisGlobaux() {
  try {
    const response = await fetch('http://localhost:3000/api/fraisC');
    const data = await response.json();

    handleApiError(data);
    console.log('Frais globaux récupérés avec succes(fetchfrais) : ', data);

    // convertir en objet

    const tauxFrais = Object.fromEntries(
      data.data.map(f => [f.NOM_FRAIS, parseFloat(f.POURCENTAGE) / 100])
    );

    return tauxFrais;
  } catch (error) {
    console.error('Erreur lors de la récupération des frais, :', error);
    throw Error('Erreur lors de la récupération des frais');
  }
}
