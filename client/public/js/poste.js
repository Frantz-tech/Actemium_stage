import { fillAchatSelect } from './postes/fillAchatSelect.js';
import { fillFraisChantierSelect } from './postes/fillChantierSelect.js';
import { fillSectionSelect } from './postes/fillSectionSelect.js';
import { sendPostes } from './postes/posteSumbit.js';
import { verifierAuthentification } from './tokenHandler/handleApi.js';

verifierAuthentification();

// Fonction pour créer dynamiquement le formulaire poste dans <main>
function createPosteForm() {
  const main = document.querySelector('main');
  main.innerHTML = ''; // Vide le contenu

  // Titre
  const h1 = document.createElement('h1');
  h1.textContent = 'POSTE';
  main.appendChild(h1);

  // Formulaire
  const form = document.createElement('form');
  form.className = 'loginForm posteForm';

  // Div nomPoste
  const divNom = document.createElement('div');
  divNom.id = 'nomPoste';

  const inputNom = document.createElement('input');
  inputNom.type = 'text';
  inputNom.id = 'libelleDevis';
  inputNom.placeholder = 'NOM DU POSTE';
  inputNom.required = true;

  divNom.appendChild(inputNom);
  form.appendChild(divNom);

  // Groupe Section Container et groupeSection
  const groupeSectionContainer = document.createElement('div');
  groupeSectionContainer.id = 'groupeSectionContainer';

  const groupeSection = document.createElement('div');
  groupeSection.className = 'groupeSection groupePoste';

  // Créer le bloc modèle contenuSection (masqué) avec classes et structure
  const contenuSection = document.createElement('div');
  contenuSection.className = 'contenuSection hidden';
  contenuSection.style.display = 'none';

  // Div interne groupeA
  const groupeA = document.createElement('div');
  groupeA.className = 'groupeA';

  // Select codeSection
  const selectCodeSection = document.createElement('select');
  selectCodeSection.name = 'codeSection';
  selectCodeSection.className = 'codeSection';
  selectCodeSection.id = 'codeSection';
  const optionCodeSection = document.createElement('option');
  optionCodeSection.textContent = 'Code Section';
  optionCodeSection.selected = true;
  optionCodeSection.disabled = true;
  optionCodeSection.value = '';

  selectCodeSection.appendChild(optionCodeSection);

  fillSectionSelect(selectCodeSection, 'main_doeuvre');
  selectCodeSection.dispatchEvent(new Event('change'));

  // Input nbr heures
  const inputNbHeures = document.createElement('input');
  inputNbHeures.type = 'number';
  inputNbHeures.className = 'nbHeures';
  inputNbHeures.placeholder = "nbr d'h";
  inputNbHeures.required = true;

  // Input totalSection (disabled)
  const inputTotalSection = document.createElement('input');
  inputTotalSection.type = 'text';
  inputTotalSection.className = 'totalSection';
  inputTotalSection.placeholder = 'Total (€)';
  inputTotalSection.disabled = true;

  // Div inputSection qui contient nbr heures et total
  const divInputSection = document.createElement('div');
  divInputSection.className = 'inputSection';
  divInputSection.appendChild(inputNbHeures);
  divInputSection.appendChild(inputTotalSection);

  groupeA.appendChild(selectCodeSection);
  groupeA.appendChild(divInputSection);

  // GroupeB div bouton supprimer
  const groupeB = document.createElement('div');
  groupeB.className = 'groupeB';

  const btnSupprimer = document.createElement('button');
  btnSupprimer.type = 'button';
  btnSupprimer.className = 'deletebtn supprimerGroupeSection';
  btnSupprimer.setAttribute('aria-label', 'Supprimer');

  groupeB.appendChild(btnSupprimer);

  contenuSection.appendChild(groupeA);
  contenuSection.appendChild(groupeB);

  groupeSection.appendChild(contenuSection);
  groupeSectionContainer.appendChild(groupeSection);
  form.appendChild(groupeSectionContainer);

  // Bouton Ajouter une Section
  const btnAddSection = document.createElement('button');
  btnAddSection.type = 'button';
  btnAddSection.id = 'ajouterGroupeSection';
  btnAddSection.className = 'btnPoste';
  btnAddSection.textContent = 'Ajouter une Section';
  form.appendChild(btnAddSection);

  // Groupe Achat Container et groupeAchat
  const groupeAchatContainer = document.createElement('div');
  groupeAchatContainer.id = 'groupeAchatContainer';

  const groupeAchat = document.createElement('div');
  groupeAchat.className = 'groupeAchat groupePoste';

  // Bloc modèle contenuAchat (masqué)
  const contenuAchat = document.createElement('div');
  contenuAchat.className = 'contenuAchat hidden';
  contenuAchat.style.display = 'none';

  // Div groupeA
  const groupeAchatA = document.createElement('div');
  groupeAchatA.className = 'groupeA';

  // Select codeAchat
  const selectCodeAchat = document.createElement('select');
  selectCodeAchat.name = 'codeAchat';
  selectCodeAchat.className = 'codeAchat';

  const optionCodeAchat = document.createElement('option');
  optionCodeAchat.textContent = 'Code Achat';
  optionCodeAchat.selected = true;
  optionCodeAchat.disabled = true;
  optionCodeAchat.value = '';

  selectCodeAchat.appendChild(optionCodeAchat);
  fillAchatSelect(selectCodeAchat, 'achats');

  // Input nomAchat
  const inputNomAchat = document.createElement('input');
  inputNomAchat.type = 'text';
  inputNomAchat.className = 'nomAchat';
  inputNomAchat.placeholder = 'Produit';

  // Div inputAchat (quantité, unité, prixU, total)
  const divInputAchat = document.createElement('div');
  divInputAchat.className = 'inputAchat';

  const inputQteAchat = document.createElement('input');
  inputQteAchat.type = 'number';
  inputQteAchat.className = 'qteAchat';
  inputQteAchat.placeholder = 'Qté';

  const inputUniteAchat = document.createElement('input');
  inputUniteAchat.type = 'text';
  inputUniteAchat.className = 'uniteAchat';
  inputUniteAchat.placeholder = 'Unité';

  const inputPrixUAchat = document.createElement('input');
  inputPrixUAchat.type = 'number';
  inputPrixUAchat.className = 'prixUAchat';
  inputPrixUAchat.placeholder = 'Prix U (€)';

  const inputTotalAchat = document.createElement('input');
  inputTotalAchat.type = 'text';
  inputTotalAchat.className = 'totalAchat';
  inputTotalAchat.placeholder = 'Total (€)';
  inputTotalAchat.disabled = true;

  divInputAchat.appendChild(inputQteAchat);
  divInputAchat.appendChild(inputUniteAchat);
  divInputAchat.appendChild(inputPrixUAchat);
  divInputAchat.appendChild(inputTotalAchat);

  groupeAchatA.appendChild(selectCodeAchat);
  groupeAchatA.appendChild(inputNomAchat);
  groupeAchatA.appendChild(divInputAchat);

  // GroupeB bouton supprimer
  const groupeAchatB = document.createElement('div');
  groupeAchatB.className = 'groupeB';

  const btnSupprimerAchat = document.createElement('button');
  btnSupprimerAchat.type = 'button';
  btnSupprimerAchat.className = 'deletebtn supprimerGroupeAchat';
  btnSupprimerAchat.setAttribute('aria-label', 'Supprimer');

  groupeAchatB.appendChild(btnSupprimerAchat);

  contenuAchat.appendChild(groupeAchatA);
  contenuAchat.appendChild(groupeAchatB);

  groupeAchat.appendChild(contenuAchat);
  groupeAchatContainer.appendChild(groupeAchat);
  form.appendChild(groupeAchatContainer);

  // Bouton Ajouter un Achat
  const btnAddAchat = document.createElement('button');
  btnAddAchat.type = 'button';
  btnAddAchat.id = 'ajouterGroupeAchat';
  btnAddAchat.className = 'btnPoste';
  btnAddAchat.textContent = 'Ajouter un Achat';
  form.appendChild(btnAddAchat);

  // Groupe Frais Chantier Container et groupeFraisChantier
  const groupeFraisChantierContainer = document.createElement('div');
  groupeFraisChantierContainer.id = 'groupeFraisChantierContainer';

  const groupeFraisChantier = document.createElement('div');
  groupeFraisChantier.className = 'groupeFraisChantier groupePoste';

  // Bloc modèle contenuFraisChantier (masqué)
  const contenuFraisChantier = document.createElement('div');
  contenuFraisChantier.className = 'contenuFraisChantier hidden';
  contenuFraisChantier.style.display = 'none';

  // Div groupeA
  const groupeFraisA = document.createElement('div');
  groupeFraisA.className = 'groupeA';

  // Select codeFraisChantier
  const selectCodeFrais = document.createElement('select');
  selectCodeFrais.name = 'codeFraisChantier';
  selectCodeFrais.className = 'codeFraisChantier';

  const optionCodeFraisChantier = document.createElement('option');
  optionCodeFraisChantier.textContent = 'Code Frais Chantier';
  optionCodeFraisChantier.selected = true;
  optionCodeFraisChantier.disabled = true;
  optionCodeFraisChantier.value = '';
  selectCodeFrais.appendChild(optionCodeFraisChantier);

  fillFraisChantierSelect(selectCodeFrais, 'chantier');

  // Input nomAchat (produit)
  const inputNomFrais = document.createElement('input');
  inputNomFrais.type = 'text';
  inputNomFrais.className = 'nomFrais';
  inputNomFrais.placeholder = 'Produit';

  // Div inputAchat (quantité, unité, prixU, total)
  const divInputFrais = document.createElement('div');
  divInputFrais.className = 'inputFrais';

  const inputQteFrais = document.createElement('input');
  inputQteFrais.type = 'number';
  inputQteFrais.className = 'qteFraisChantier';
  inputQteFrais.placeholder = 'Qté';
  inputQteFrais.required = true;

  const inputUniteFrais = document.createElement('input');
  inputUniteFrais.type = 'text';
  inputUniteFrais.className = 'uniteFraisChantier';
  inputUniteFrais.placeholder = 'Unité';
  inputUniteFrais.required = true;

  const inputPrixUFrais = document.createElement('input');
  inputPrixUFrais.type = 'number';
  inputPrixUFrais.className = 'prixUFraisChantier';
  inputPrixUFrais.placeholder = 'Prix U (€)';
  inputPrixUFrais.required = true;

  const inputTotalFrais = document.createElement('input');
  inputTotalFrais.type = 'text';
  inputTotalFrais.className = 'totalFraisChantier';
  inputTotalFrais.placeholder = 'Total (€)';
  inputTotalFrais.disabled = true;

  divInputFrais.appendChild(inputQteFrais);
  divInputFrais.appendChild(inputUniteFrais);
  divInputFrais.appendChild(inputPrixUFrais);
  divInputFrais.appendChild(inputTotalFrais);

  groupeFraisA.appendChild(selectCodeFrais);
  groupeFraisA.appendChild(inputNomFrais);
  groupeFraisA.appendChild(divInputFrais);

  // GroupeB bouton supprimer
  const groupeFraisB = document.createElement('div');
  groupeFraisB.className = 'groupeB';

  const btnSupprimerFrais = document.createElement('button');
  btnSupprimerFrais.type = 'button';
  btnSupprimerFrais.className = 'deletebtn supprimerGroupeFraisChantier';
  btnSupprimerFrais.setAttribute('aria-label', 'Supprimer');

  groupeFraisB.appendChild(btnSupprimerFrais);

  contenuFraisChantier.appendChild(groupeFraisA);
  contenuFraisChantier.appendChild(groupeFraisB);

  groupeFraisChantier.appendChild(contenuFraisChantier);
  groupeFraisChantierContainer.appendChild(groupeFraisChantier);
  form.appendChild(groupeFraisChantierContainer);

  // Bouton Ajouter un Frais de Chantier
  const btnAddFraisChantier = document.createElement('button');
  btnAddFraisChantier.type = 'button';
  btnAddFraisChantier.id = 'ajouterGroupeFraisChantier';
  btnAddFraisChantier.className = 'btnPoste';
  btnAddFraisChantier.textContent = 'Ajouter un Frais de Chantier';
  form.appendChild(btnAddFraisChantier);

  // Bouton Créer
  const btnCreerPoste = document.createElement('button');
  btnCreerPoste.type = 'button';
  btnCreerPoste.className = 'btnCreer';
  btnCreerPoste.textContent = 'Créer';

  form.appendChild(btnCreerPoste);

  main.appendChild(form);
}

// Appel de la création du formulaire dynamique au chargement
createPosteForm();

// Récupération des boutons ajout après création du DOM dynamique
const btnAddSection = document.getElementById('ajouterGroupeSection');
const btnAddAchat = document.getElementById('ajouterGroupeAchat');
const btnAddFraisChantier = document.getElementById('ajouterGroupeFraisChantier');
const btnCreerPoste = document.querySelector('.btnCreer');

function ajouterBloc(modeleSelector, containerSelector) {
  const modele = document.querySelector(modeleSelector);
  if (!modele) return;

  const clone = modele.cloneNode(true);
  clone.classList.remove('hidden');
  clone.style.display = 'flex';
  clone.removeAttribute('id');

  clone.querySelectorAll('input').forEach(input => (input.value = ''));
  clone.querySelectorAll('select').forEach(select => (select.selectedIndex = 0));

  document.querySelector(containerSelector).appendChild(clone);

  const selectCodeSection = clone.querySelector('.codeSection');
  const inputNbHeures = clone.querySelector('.nbHeures');
  const inputTotalSection = clone.querySelector('.totalSection');

  // Fonction de calcul du total section
  if (selectCodeSection && inputNbHeures && inputTotalSection) {
    function updateTotalSection() {
      const selectedOption = selectCodeSection.options[selectCodeSection.selectedIndex];
      const taux =
        selectedOption && selectedOption.dataset && selectedOption.dataset.taux
          ? parseFloat(selectedOption.dataset.taux)
          : 0;
      const nbHeures = parseFloat(inputNbHeures.value) || 0;
      const total = taux * nbHeures;
      console.log('Taux:', taux, 'Heures:', nbHeures, 'Total:', total);

      inputTotalSection.value = total ? total.toFixed(2) + ' €' : '';
    }
    selectCodeSection.addEventListener('change', updateTotalSection);
    inputNbHeures.addEventListener('input', updateTotalSection);
    updateTotalSection();
  }

  const selectCodeAchat = clone.querySelector('.codeAchat');
  const inputNomAchat = clone.querySelector('.nomAchat');
  const inputQteAchat = clone.querySelector('.qteAchat');
  const inputPrixUAchat = clone.querySelector('.prixUAchat');
  const inputTotalAchat = clone.querySelector('.totalAchat');

  if (selectCodeAchat && inputNomAchat && inputQteAchat && inputPrixUAchat && inputTotalAchat) {
    // Fonction de calcul des Achats
    function updateTotalAchat() {
      const qte = parseFloat(inputQteAchat.value) || 0;
      const prixU = parseFloat(inputPrixUAchat.value) || 0;
      const total = qte * prixU;
      inputTotalAchat.value = total ? total.toFixed(2) + ' €' : '';
    }
    inputQteAchat.addEventListener('input', updateTotalAchat);
    inputPrixUAchat.addEventListener('input', updateTotalAchat);
    updateTotalAchat();
  }

  const selectCodeFrais = clone.querySelector('.codeFraisChantier');
  const inputNomFrais = clone.querySelector('.nomFrais');
  const inputQteFrais = clone.querySelector('.qteFraisChantier');
  const inputPrixUFrais = clone.querySelector('.prixUFraisChantier');
  const inputTotalFrais = clone.querySelector('.totalFraisChantier');

  if (selectCodeFrais && inputNomFrais && inputQteFrais && inputPrixUFrais && inputTotalFrais) {
    // Fonction de calcul des Frais
    function updateTotalFrais() {
      const qte = parseFloat(inputQteFrais.value) || 0;
      const prixU = parseFloat(inputPrixUFrais.value) || 0;
      const total = qte * prixU;
      inputTotalFrais.value = total ? total.toFixed(2) + ' €' : '';
    }
    inputQteFrais.addEventListener('input', updateTotalFrais);
    inputPrixUFrais.addEventListener('input', updateTotalFrais);
    updateTotalFrais();
  }
}

btnAddSection.addEventListener('click', () => ajouterBloc('.contenuSection', '.groupePoste'));
btnAddAchat.addEventListener('click', () => ajouterBloc('.contenuAchat', '.groupeAchat'));
btnAddFraisChantier.addEventListener('click', () =>
  ajouterBloc('.contenuFraisChantier', '.groupeFraisChantier')
);

// Suppressions avec event delegation
document.addEventListener('click', e => {
  if (e.target.classList.contains('supprimerGroupeSection')) {
    const bloc = e.target.closest('.contenuSection');
    if (bloc && confirm('Es-tu sûr de vouloir supprimer cette section ?')) {
      bloc.remove();
    }
  }

  if (e.target.classList.contains('supprimerGroupeAchat')) {
    const bloc = e.target.closest('.contenuAchat');
    if (bloc && confirm('Es-tu sûr de vouloir supprimer cet achat ?')) {
      bloc.remove();
    }
  }

  if (e.target.classList.contains('supprimerGroupeFraisChantier')) {
    const bloc = e.target.closest('.contenuFraisChantier');
    if (bloc && confirm('Es-tu sûr de vouloir supprimer ce frais de chantier ?')) {
      bloc.remove();
    }
  }
});

btnCreerPoste.addEventListener('click', () => {
  sendPostes();
});
