import { segmList } from '../../lists/segmentionList.js';
import { handleApiError } from '../../tokenHandler/handleApi.js';

export async function fetchExpertises() {
  fetch('http://localhost:3000/api/expertises')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Expertises récupérées :', data);

      const expertises = data.data;

      const urlCheck = window.location.pathname;
      if (urlCheck.includes('/devis') && Array.isArray(expertises) && expertises.length > 0) {
        expertiseSelect(expertises);
      }

      if (
        urlCheck.includes('adminDashboard') &&
        Array.isArray(expertises) &&
        expertises.length > 0
      ) {
        segmList(expertises);
        document.querySelector('h2').textContent = 'Liste des  Expertises';
      }

      function expertiseSelect(expertise) {
        const select = document.getElementById('expertiseSegm');
        expertise.forEach(expertise => {
          const option = document.createElement('option');
          option.value = expertise.EXP_ID;
          option.textContent = `${expertise.CODE} - ${expertise.TYPE} `;
          select.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des expertises', error);
      const select = document.getElementById('expertiseSegm');
      select.innerHTML = '<option>Erreur de récupération des expertises</option>';
    });
}
