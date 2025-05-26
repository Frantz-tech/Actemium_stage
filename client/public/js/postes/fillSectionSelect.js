export function fillSectionSelect(selectElement, context) {
  fetch(`http://localhost:3000/api/sections?context=${context}`)
    .then(res => res.json())
    .then(data => {
      console.log('Sections recues : ', data);

      const sections = data.data;
      if (Array.isArray(sections)) {
        sections.forEach(s => {
          const option = document.createElement('option');
          option.value = s.SECTION;
          option.textContent = s.LIBELLE;
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
