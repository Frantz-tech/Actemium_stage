import { handleApiError } from '../tokenHandler/handleApi.js';

export function fillAchatSelect(selectElement, context) {
  fetch(`http://localhost:3000/api/achats?context=${context}`)
    .then(res => res.json())
    .then(data => {
      handleApiError(data);
      console.log('Achats recus : ', data);

      const achats = data.data;
      if (Array.isArray(achats)) {
        achats.forEach(a => {
          const option = document.createElement('option');
          option.value = a.SECTION;
          option.textContent = a.LIBELLE;
          selectElement.appendChild(option);
        });
      } else {
        selectElement.innerHTML = '<option>Erreur lors de la récupération</option>';
      }
    })
    .catch(err => {
      console.error('Erreur fetch achat', err);
      selectElement.innerHTML = '<option>Erreur fetch</option>';
    });
}
