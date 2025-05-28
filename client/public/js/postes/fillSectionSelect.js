import { handleApiError } from '../tokenHandler/handleApi.js';

export function fillSectionSelect(selectElement, context) {
  fetch(`http://localhost:3000/api/sections?context=${context}`)
    .then(res => res.json())
    .then(data => {
      handleApiError(data);
      console.log('Sections recues : ', data);

      const sections = data.data;
      if (Array.isArray(sections)) {
        sections.forEach(s => {
          const option = document.createElement('option');
          option.value = s.CODE_ID;
          option.textContent = s.LIBELLE;
          option.dataset.taux = s.TAUX ?? 0;

          selectElement.appendChild(option);
        });
      } else {
        selectElement.innerHTML = '<option>Erreur lors de la récupération</option>';
      }
    })
    .catch(err => {
      console.error('Erreur fetch section', err);
      selectElement.innerHTML = '<option>Erreur fetch</option>';
    });
}
