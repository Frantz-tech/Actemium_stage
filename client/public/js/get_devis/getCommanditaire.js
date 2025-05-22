export function fetchCommanditaires() {
  fetch('http://localhost:3000/api/commanditaires')
    .then(response => response.json())
    .then(data => {
      console.log('Commanditaires récupérées :', data);

      const commanditaireSelect = document.getElementById('cmdt');
      const commanditaires = data.data;
      if (Array.isArray(commanditaires) && commanditaires.length > 0) {
        commanditaires.forEach(commanditaire => {
          const option = document.createElement('option');
          option.value = commanditaire.CMDT_ID;
          option.textContent = `${commanditaire.NOM}`;
          commanditaireSelect.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error(' Erreur lors de la récupération des commanditaires', error);
      const commanditaireSelect = document.getElementById('cmdt');
      commanditaireSelect.innerHTML = '<option>Erreur de récupération des commanditaires</option>';
    });
}
