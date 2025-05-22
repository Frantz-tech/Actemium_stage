export function fetchExpertises() {
  fetch('http://localhost:3000/api/expertises')
    .then(response => response.json())
    .then(data => {
      console.log('Expertises récupérées :', data);

      const expertiseSelect = document.getElementById('expertiseSegm');
      const expertises = data.data;
      if (Array.isArray(expertises) && expertises.length > 0) {
        expertises.forEach(expertise => {
          const option = document.createElement('option');
          option.value = expertise.EXP_ID;
          option.textContent = `${expertise.CODE} - ${expertise.TYPE}`;
          expertiseSelect.appendChild(option);
        });
      } else {
        expertiseSelect.innerHTML = '<option>Erreur de récupération des expertises</option>';
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des expertises', error);
      const expertiseSelect = document.getElementById('expertiseSegm');
      expertiseSelect.innerHTML = '<option>Erreur de récupération des expertises</option>';
    });
}
