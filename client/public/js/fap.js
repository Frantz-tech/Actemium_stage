import { afficherModalPoste } from './modalPoste.js';

document.querySelector('h1').innerText = 'FAP ACTEMIUM';
const btnExporterPDF = document.querySelector('.btnExporter');
btnExporterPDF.textContent = `Exporter PDF`;
const btnMail = document.querySelector('.btnMail');
btnMail.textContent = `Envoyer par mail`;
fetch('../js/postList.json')
  .then(response => response.json())
  .then(data => {
    console.log('JSON local chargé = ', data.postes);

    const postesList = document.getElementById('postesList');
    const calculsList = document.getElementById('calculs');
    let totalTousPostes = 0;

    if (Array.isArray(data.postes)) {
      data.postes.forEach(poste => {
        let totalSection = 0;
        let totalAchats = 0;
        let totalFraisChantier = 0;
        poste.section.forEach(item => {
          totalSection += item.total;
        });
        poste.achats.forEach(item => {
          totalAchats += item.total;
        });
        poste.frais_chantier.forEach(item => {
          totalFraisChantier += item.total;
        });
        const totalGlobal = totalSection + totalAchats + totalFraisChantier;

        totalTousPostes += totalGlobal;
        console.log('montant des postes : ', totalTousPostes);

        const postes = document.createElement('div');
        postes.classList.add('posteFap');

        const libelle = document.createElement('div');
        libelle.classList.add('libellePostFap');
        libelle.textContent = `${poste.nom}`;

        postes.addEventListener('click', () => {
          afficherModalPoste(poste, { lectureSeule: true });
        });

        const montant = document.createElement('div');
        montant.classList.add('montantPostFap');
        montant.textContent = `Montant : ${totalGlobal.toLocaleString('fr-FR')} €`;

        postes.appendChild(libelle);
        postes.appendChild(montant);
        postesList.appendChild(postes);
      });
    }

    // Section pour le total Main d'oeuvre
    // Section pour le total Achats
    // Section pour le total Frais de Chantier
    // Section pour les Frais Achats & Sous traitance + Etudes

    const prixInter = document.createElement('div');
    prixInter.classList.add('styleCalculs');

    const prixInterP = document.createElement('p');
    prixInterP.classList.add('textCalculs');

    const montantPrixInter = document.createElement('p');
    montantPrixInter.classList.add('montantCalculs');

    prixInterP.textContent = 'Prix de revient inter';
    montantPrixInter.textContent = `${totalTousPostes.toLocaleString('fr-FR')} €`;

    prixInter.appendChild(prixInterP);
    prixInter.appendChild(montantPrixInter);

    // Calcul des frais

    // Calcul du total des frais de devis sans suite (5% de totalTousPostes)
    const totalFraisDevisSansSuite = (totalTousPostes * 0.05).toFixed(2);
    // Calcul du total des frais Financiers
    const totalFraisFinanciers = (totalTousPostes * 0.015).toFixed(2);
    // Calcul du total des frais de groupe
    const totalFraisGroupe = (totalTousPostes * 0.025).toFixed(2);

    const sectionFrais = document.createElement('div');
    sectionFrais.classList.add('styleCalculs');

    const groupeFrais1 = document.createElement('div');
    groupeFrais1.classList.add('groupeFrais1');

    const fraisDevisSS = document.createElement('p');
    fraisDevisSS.classList.add('textCalculs');

    const montantDevisSS = document.createElement('p');
    montantDevisSS.classList.add('montantCalculs');
    fraisDevisSS.textContent = 'Frais de devis sans suite';
    montantDevisSS.textContent = `${Number(totalFraisDevisSansSuite).toLocaleString('fr-FR')} €`;

    const groupeFrais2 = document.createElement('div');
    groupeFrais2.classList.add('groupeFrais2');

    const fraisFinancier = document.createElement('p');
    fraisFinancier.classList.add('textCalculs');

    const montantFraisFinanciers = document.createElement('p');
    montantFraisFinanciers.classList.add('montantCalculs');
    fraisFinancier.textContent = 'Frais Financiers';
    montantFraisFinanciers.textContent = `${Number(totalFraisFinanciers).toLocaleString('fr-FR')} €`;

    const groupeFrais3 = document.createElement('div');
    groupeFrais3.classList.add('groupeFrais3');

    const fraisGroupe = document.createElement('p');
    fraisGroupe.classList.add('textCalculs');

    const montantFraisGroupe = document.createElement('p');
    montantFraisGroupe.classList.add('montantCalculs');
    fraisGroupe.textContent = 'Frais de Groupe';

    montantFraisGroupe.textContent = `${Number(totalFraisGroupe).toLocaleString('fr-FR')} €`;

    // Calcul du prix de revient
    const totalPrixRevient =
      Number(totalTousPostes) +
      Number(totalFraisDevisSansSuite) +
      Number(totalFraisFinanciers) +
      Number(totalFraisGroupe);

    const prixRevient = document.createElement('div');
    prixRevient.classList.add('styleCalculs');

    const prixRevientP = document.createElement('p');
    prixRevientP.classList.add('textCalculs');

    const montantPrixRevient = document.createElement('p');
    montantPrixRevient.classList.add('montantCalculs');

    prixRevientP.textContent = 'Prix de revient';
    montantPrixRevient.textContent = `${totalPrixRevient.toLocaleString('fr-FR')} €`;

    const margeVoulue = document.createElement('div');
    margeVoulue.classList.add('styleCalculs');

    const margeVoulueP = document.createElement('p');
    margeVoulueP.textContent = `Marge voulue`;
    margeVoulueP.classList.add('textCalculs');

    const montantMargeVoulue = document.createElement('input');
    montantMargeVoulue.classList.add('montantCalculs');
    montantMargeVoulue.min = '0';
    montantMargeVoulue.type = 'number';
    montantMargeVoulue.placeholder = '%';

    const prixVenteEstimee = document.createElement('div');
    prixVenteEstimee.classList.add('styleCalculs');

    const prixVenteEstimeeP = document.createElement('p');
    prixVenteEstimeeP.classList.add('textCalculs');
    prixVenteEstimeeP.textContent = `Prix de vente estimée`;

    const montantPrixVenteEstimee = document.createElement('p');
    montantPrixVenteEstimee.classList.add('montantCalculs');

    const prixVenteRetenue = document.createElement('div');
    prixVenteRetenue.classList.add('styleCalculs');

    const prixVenteRetenueP = document.createElement('p');
    prixVenteRetenueP.classList.add('textCalculs');
    prixVenteRetenueP.textContent = `Prix de vente retenue`;

    const montantPrixVenteRetenue = document.createElement('input');
    montantPrixVenteRetenue.classList.add('montantCalculs', 'pvr');
    montantPrixVenteRetenue.type = 'text';

    const marge = document.createElement('div');
    marge.classList.add('styleCalculs');

    const margeP = document.createElement('p');
    margeP.classList.add('textCalculs');
    margeP.textContent = `Marge`;

    const montantMarge = document.createElement('p');
    montantMarge.classList.add('montantCalculs');
    montantMarge.textContent = `%`;

    sectionFrais.appendChild(groupeFrais1);
    sectionFrais.appendChild(groupeFrais2);
    sectionFrais.appendChild(groupeFrais3);
    groupeFrais1.appendChild(fraisDevisSS);
    groupeFrais1.appendChild(montantDevisSS);
    groupeFrais2.appendChild(fraisFinancier);
    groupeFrais2.appendChild(montantFraisFinanciers);
    groupeFrais3.appendChild(fraisGroupe);
    groupeFrais3.appendChild(montantFraisGroupe);
    prixRevient.appendChild(prixRevientP);
    prixRevient.appendChild(montantPrixRevient);
    margeVoulue.appendChild(margeVoulueP);
    margeVoulue.appendChild(montantMargeVoulue);

    // Listen to input changes and calculate estimated sale price
    montantMargeVoulue.addEventListener('input', () => {
      const valeurMarge = parseFloat(montantMargeVoulue.value);
      if (!isNaN(valeurMarge)) {
        const prixVenteEsti = totalPrixRevient * (1 + valeurMarge / 100);
        montantPrixVenteEstimee.textContent = `${prixVenteEsti.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €`;
      } else {
        montantPrixVenteEstimee.textContent = '';
      }
    });

    prixVenteEstimee.appendChild(prixVenteEstimeeP);
    prixVenteEstimee.appendChild(montantPrixVenteEstimee);
    prixVenteRetenue.appendChild(prixVenteRetenueP);
    prixVenteRetenue.appendChild(montantPrixVenteRetenue);

    // Listen to input changes on montantPrixVenteRetenue to calculate and display the final margin,
    // and keep the formatted value in the input field
    montantPrixVenteRetenue.addEventListener('input', () => {
      // (remove spaces and non-numeric characters)
      let valeur = montantPrixVenteRetenue.value.replace(/\s/g, '').replace(/[^0-9.]/g, '');
      const prixRetenu = parseFloat(valeur);

      const prixRevient = totalPrixRevient;

      if (!isNaN(prixRevient) && prixRevient !== 0 && !isNaN(prixRetenu)) {
        // valeur d'arrivé - valeur de départ / valeur de départ * 100
        const margeFinale = ((prixRetenu - prixRevient) / prixRevient) * 100;
        montantMarge.textContent = `${margeFinale.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} %`;

        // Reformat avec séparateur entre les nombres
        montantPrixVenteRetenue.value = prixRetenu.toLocaleString('fr-FR');
      } else {
        montantMarge.textContent = '%';
      }
    });
    marge.appendChild(margeP);
    marge.appendChild(montantMarge);

    calculsList.appendChild(prixInter);
    calculsList.appendChild(sectionFrais);
    calculsList.appendChild(prixRevient);
    calculsList.appendChild(margeVoulue);
    calculsList.appendChild(prixVenteEstimee);
    calculsList.appendChild(prixVenteRetenue);
    calculsList.appendChild(marge);
  });
