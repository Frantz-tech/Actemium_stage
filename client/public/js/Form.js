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

// Fonction pour récupérer la liste des expertises
function fetchExpertises() {
  fetch('http://localhost:3001/expertise')
    .then(response => response.json())
    .then(data => {
      console.log('Expertises récupérées :', data);

      const expertiseSelect = document.getElementById('expertise');
      const expertises = data.data;
      if (Array.isArray(expertises) && expertises.length > 0) {
        expertises.forEach(expertise => {
          const option = document.createElement('option');
          option.value = expertise._id;
          option.textContent = `${expertise.code} - ${expertise.type}`;
          expertiseSelect.appendChild(option);
        });
      } else {
        expertiseSelect.innerHTML = 'option>Erreur de récupération des expertises</option>';
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des expertises', error);
      const expertiseSelect = document.getElementById('contrat');
      expertiseSelect.innerHTML = '<option>Erreur de récupération des expertises</option>';
    });
}

const step1 = document.querySelector('.step-1 select');
const step2 = document.querySelector('.step-2 select');
const step3 = document.querySelector('.step-3 select');
const step4 = document.querySelector('.step-4 select');
const step5 = document.querySelector('.step-5 button');

step1.addEventListener('change', () => {
  const isValid = step1.value !== '';
  step2.disabled = !isValid;
});
step2.addEventListener('change', () => {
  const isValid = step2.value !== '';
  step3.disabled = !isValid;
});
step3.addEventListener('change', () => {
  const isValid = step3.value !== '';
  step4.disabled = !isValid;
});
step4.addEventListener('change', () => {
  const isValid = step4.value !== '';
  step5.disabled = !isValid;
});

const allSteps = document.querySelectorAll('select');

// Fonction pour changer l'apparance du select lors du changement dans l'option
allSteps.forEach(select => {
  select.addEventListener('change', () => {
    if (select.value === '') {
      select.classList.add('invalid');
      select.classList.remove('valid');
    } else {
      select.classList.add('valid');
      select.classList.remove('invalid');
    }
  });
});

fetchContrats();
fetchExpertises();
