document.querySelector('h1').innerText = 'ACTEMIUM';

const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
const ra_id = utilisateur?.RA_ID;

const btnDevis1 = document.querySelector('.btnCreerDevis');
btnDevis1.addEventListener('click', () => {
  window.location.href = `../pages/devis.html?ra_id=${ra_id}`;
});
const btnDevis2 = document.querySelector('.btnVoirDevis');
btnDevis2.addEventListener('click', () => {
  window.location.href = `../pages/devisList.html?ra_id=${ra_id}`;
});
btnDevis1.innerText = 'Créer un devis';
btnDevis2.innerText = 'Voir mes devis';
