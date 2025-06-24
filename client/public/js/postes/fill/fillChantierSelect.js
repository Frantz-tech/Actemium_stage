import { handleApiError } from '../../tokenHandler/handleApi.js';

export function fillFraisChantierSelect(selectElement, context) {
  fetch(`http://localhost:3000/api/frais?context=${context}`)
    .then(res => res.json())
    .then(data => {
      handleApiError(data);
      console.log('Frais Chantier recus : ', data);

      const fraisChantier = data.data;
      if (Array.isArray(fraisChantier)) {
        fraisChantier.forEach(f => {
          const option = document.createElement('option');
          option.value = f.CODE_ID;
          option.textContent = f.LIBELLE;
          selectElement.appendChild(option);
        });
      } else {
        selectElement.innerHTML = '<option>Erreur lors de la récupération</option>';
      }
    })
    .catch(err => {
      console.error('Erreur fetch fraisChantier', err);
      selectElement.innerHTML = '<option>Erreur fetch</option>';
    });
}
