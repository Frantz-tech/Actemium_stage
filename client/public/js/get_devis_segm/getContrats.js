import { handleApiError } from '../tokenHandler/handleApi.js';

export function fetchContrats() {
  fetch('http://localhost:3000/api/contrats')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Contrats récupérés : ', data);

      const contratSelect = document.getElementById('contratSegm');
      const contrats = data.data;
      if (Array.isArray(contrats) && contrats.length > 0) {
        contrats.forEach(contrat => {
          const option = document.createElement('option');
          option.value = contrat.CONTRAT_ID;
          option.textContent = `${contrat.CODE} - ${contrat.TYPE}`;
          contratSelect.appendChild(option);
        });
      } else {
        contratSelect.innerHTML = '<option> Aucun contrat trouvé </option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des contrats:', error);
      const contratSelect = document.getElementById('contratSegm');
      contratSelect.innerHTML = '<option>Erreur de récupération des contrats</option>';
    });
}
