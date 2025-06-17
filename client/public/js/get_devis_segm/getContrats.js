import { segmList } from '../lists/semgentionList.js';
import { handleApiError } from '../tokenHandler/handleApi.js';

export async function fetchContrats() {
  fetch('http://localhost:3000/api/contrats')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Contrats récupérés : ', data);

      const contrats = data.data;

      const urlCheck = window.location.pathname;

      if (urlCheck.includes('/devis') && Array.isArray(contrats) && contrats.length > 0) {
        contratSelect(contrats);
      }
      if (urlCheck.includes('adminDashboard') && Array.isArray(contrats) && contrats.length > 0) {
        segmList(contrats);
        document.querySelector('h2').textContent = 'Liste des Contrats';
      }

      function contratSelect(contrat) {
        contrat.forEach(contrat => {
          const select = document.getElementById('contratSegm');

          const option = document.createElement('option');
          option.value = contrat.CONTRAT_ID;
          option.textContent = `${contrat.CODE} - ${contrat.TYPE}`;
          select.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des contrats:', error);
      const select = document.getElementById('contratSegm');
      select.innerHTML = '<option>Erreur de récupération des contrats</option>';
    });
}
