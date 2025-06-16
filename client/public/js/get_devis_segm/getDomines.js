import { segmList } from '../lists/semgentionList.js';
import { handleApiError } from '../tokenHandler/handleApi.js';

export function fetchDomaines() {
  fetch('http://localhost:3000/api/domaines')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Domaine récupérées :', data);

      const domaines = data.data;

      const urlCheck = window.location.pathname;

      if (urlCheck.includes('/devis') && Array.isArray(domaines) && domaines.length > 0) {
        domaineSelect(domaines);
      }
      if (urlCheck.includes('/adminDashboard') && Array.isArray(domaines) && domaines.length > 0) {
        segmList(domaines);
      }
      function domaineSelect(domaine) {
        const select = document.getElementById('domaineSegm');
        domaine.forEach(domaine => {
          const option = document.createElement('option');
          option.value = domaine.DOMAINE_ID;
          option.textContent = `${domaine.CODE} - ${domaine.TYPE}`;
          select.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des domaines', error);
      const select = document.getElementById('domaineSegm');
      select.innerHTML = '<option>Erreur de récupération des domaines</option>';
    });
}
