import { segmList } from '../../lists/segmentionList.js';
import { handleApiError } from '../../tokenHandler/handleApi.js';

export async function fetchClients() {
  fetch('http://localhost:3000/api/clients')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Clients récupérés : ', data);

      const clients = data.data;

      const urlCheck = window.location.pathname;

      if (urlCheck.includes('/devis') && Array.isArray(clients) && clients.length > 0) {
        clientSelect(clients);
      }
      if (urlCheck.includes('/adminDashboard') && Array.isArray(clients) && clients.length > 0) {
        segmList(clients);
        document.querySelector('h2').textContent = 'Liste des Clients';
      }
      function clientSelect(clients) {
        const select = document.getElementById('clientSegm');
        clients.forEach(client => {
          const option = document.createElement('option');
          option.value = client.CLIENT_ID;
          option.textContent = `${client.CODE} - ${client.TYPE} `;
          select.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des clients:', error);
      const select = document.getElementById('clientSegm');
      select.innerHTML = '<option>Erreur de récupération des clients</option>';
    });
}
