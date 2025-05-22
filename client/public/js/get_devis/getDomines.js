export function fetchDomaines() {
  fetch('http://localhost:3000/api/domaines')
    .then(response => response.json())
    .then(data => {
      console.log('Domaine récupérées :', data);

      const domaineSelect = document.getElementById('domaineSegm');
      const domaines = data.data;
      if (Array.isArray(domaines) && domaines.length > 0) {
        domaines.forEach(domaine => {
          const option = document.createElement('option');
          option.value = domaine.DOMAINE_ID;
          option.textContent = `${domaine.CODE} - ${domaine.TYPE}`;
          domaineSelect.appendChild(option);
        });
      } else {
        domaineSelect.innerHTML = '<option>Erreur de récupération des domaines</option>';
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des domaines', error);
      const domaineSelect = document.getElementById('domaineSegm');
      domaineSelect.innerHTML = '<option>Erreur de récupération des domaines</option>';
    });
}
