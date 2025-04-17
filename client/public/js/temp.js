// Fonction pour récupérer la liste des contrats

function fetchContrats() {
  fetch('http://localhost:3001/contrat')
    .then(response => response.json())
    .then(data => {
      console.log('Contrats récupérés : ', data);

      const contratSelect = document.getElementById('contrat');
      const contrats = data.data;
      if (Array.isArray(contrats) && contrats.length > 0) {
        contrats.forEach(contrat => {
          const option = document.createElement('option');
          option.value = contrat._id;
          option.textContent = `${contrat.code} - ${contrat.type} - ${contrat.brand}`;
          contratSelect.appendChild(option);
        });
      } else {
        contratSelect.innerHTML = '<option> Aucun contrat trouvé </option>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des contrats:', error);
      const contratSelect = document.getElementById('contrat');
      contratSelect.innerHTML = '<option>Erreur de récupération des contrats</option>';
    });
}

fetchContrats();
