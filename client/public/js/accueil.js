document.querySelector('h1').innerText = 'ACTEMIUM';

const btnDevis1 = document.querySelector('.btnCreerDevis');
btnDevis1.addEventListener('click', () => {
  window.location.href = '../pages/devis.html';
});
const btnDevis2 = document.querySelector('.btnVoirDevis');
btnDevis2.addEventListener('click', () => {
  window.location.href = '../pages/devisList.html';
});
btnDevis1.innerText = 'Créer un devis';
btnDevis2.innerText = 'Voir mes devis';
