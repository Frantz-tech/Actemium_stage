import { handleApiError } from '../tokenHandler/handleApi.js';

export function fetchClients() {
  fetch('http://localhost:3000/api/clients')
    .then(response => response.json())
    .then(data => {
      handleApiError(data);
      console.log('Clients récupérés : ', data);

      const contratSelect = document.getElementById('clientSegm');
      const clients = data.data;
      if (Array.isArray(clients) && clients.length > 0) {
        clients.forEach(client => {
          const option = document.createElement('option');
          option.value = client.CLIENT_ID;
          option.textContent = `${client.CODE} - ${client.TYPE} `;
          contratSelect.appendChild(option);
        });
      } else {
        contratSelect.innerHTML = '<option> Aucun client trouvé </option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des clients:', error);
      const contratSelect = document.getElementById('contratSegm');
      contratSelect.innerHTML = '<option>Erreur de récupération des clients</option>';
    });
}
