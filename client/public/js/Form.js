// Fonction pour récupérer la liste des contrats

function fetchContrats() {
  fetch('http://localhost:3001/contrat')
    .then(response => response.json())
    .then(data => {
      console.log('Contrats récupérés : ', data);
    });

  // const contratSelect = document.getElementById('contrat');
}

fetchContrats();
