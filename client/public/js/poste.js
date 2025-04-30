const btnCreerPoste = document.querySelector('.btnCreer');
const btnAddSection = document.getElementById('ajouterGroupeSection');
const btnAddAchat = document.getElementById('ajouterGroupeAchat');
const btnAddFraisChantier = document.getElementById('ajouterGroupeFraisChantier');
const btnDeleteSection = document.querySelector('.supprimerGroupeSection');
const btnDeleteAchat = document.querySelector('.supprimerGroupeAchat');
const btnDeleteFraisChantier = document.querySelector('.supprimerGroupeFraisChantier');
document.querySelector('h1').innerText = 'POSTE';
btnCreerPoste.innerText = 'Créer';

btnAddSection.addEventListener('click', () => {
  alert('click sur ajouter une section');
});

btnAddAchat.addEventListener('click', () => {
  alert('click sur ajouter un achat');
});

btnAddFraisChantier.addEventListener('click', () => {
  alert('click sur ajouter un frais de chantier');
});

btnDeleteSection.addEventListener('click', () => {
  alert('click pour delete une section');
});
btnDeleteAchat.addEventListener('click', () => {
  alert('click pour delete un achat');
});
btnDeleteFraisChantier.addEventListener('click', () => {
  alert('click pour delete un frais de chantier');
});

btnCreerPoste.addEventListener('click', () => {
  alert('hello world');
  window.location.href = '../pages/devisList.html';
});
