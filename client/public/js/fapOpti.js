// // Fonction générique pour créer un élément HTML avec des classes et du texte
// function creerElement(type, classes = [], texte = '') {
//   const element = document.createElement(type);
//   element.textContent = texte;
//   classes.forEach(cl => element.classList.add(cl));
//   return element;
// }

// // Fonction pour créer une liste à partir d'un tableau d'objets
// function creerListe(items, className) {
//   const ul = document.createElement('ul');
//   items.forEach(item => {
//     const li = creerElement('li', [className], item);
//     ul.appendChild(li);
//   });
//   return ul;
// }

// // Fonction pour afficher un montant
// function afficherMontant(parentElement, montant, label) {
//   const montantDiv = creerElement('div', ['styleCalculs']);
//   const montantLabel = creerElement('p', ['textCalculs'], label);
//   const montantValue = creerElement(
//     'p',
//     ['montantCalculs'],
//     `${montant.toLocaleString('fr-FR')} €`
//   );
//   montantDiv.appendChild(montantLabel);
//   montantDiv.appendChild(montantValue);
//   parentElement.appendChild(montantDiv);
// }

// // Récupération des données et création des postes
// document.querySelector('h1').innerText = 'FAP ACTEMIUM';
// const btnExporterPDF = document.querySelector('.btnExporter');
// btnExporterPDF.textContent = `Exporter PDF`;
// const btnMail = document.querySelector('.btnMail');
// btnMail.textContent = `Envoyer par mail`;

// fetch('../js/postList.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log('JSON local chargé = ', data.postes);

//     const postesList = document.getElementById('postesList');
//     const calculsList = document.getElementById('calculs');
//     let totalTousPostes = 0;

//     // Création des postes
//     data.postes.forEach(poste => {
//       let totalSection = poste.section.reduce((acc, item) => acc + item.total, 0);
//       let totalAchats = poste.achats.reduce((acc, item) => acc + item.total, 0);
//       let totalFraisChantier = poste.frais_chantier.reduce((acc, item) => acc + item.total, 0);
//       const totalGlobal = totalSection + totalAchats + totalFraisChantier;

//       totalTousPostes += totalGlobal;

//       const posteDiv = creerElement('div', ['posteFap']);
//       const libelle = creerElement('div', ['libellePostFap'], poste.nom);
//       const montant = creerElement(
//         'div',
//         ['montantPostFap'],
//         `Montant : ${totalGlobal.toLocaleString('fr-FR')} €`
//       );

//       posteDiv.appendChild(libelle);
//       posteDiv.appendChild(montant);
//       posteDiv.addEventListener('click', () => afficherModalPoste(poste, { lectureSeule: true }));

//       postesList.appendChild(posteDiv);
//     });

//     // Création du prix de revient
//     afficherMontant(calculsList, totalTousPostes, 'Prix de revient inter');

//     // Calcul des frais
//     const totalFraisDevisSansSuite = (totalTousPostes * 0.05).toFixed(2);
//     const totalFraisFinanciers = (totalTousPostes * 0.015).toFixed(2);
//     const totalFraisGroupe = (totalTousPostes * 0.025).toFixed(2);

//     // Création des frais
//     afficherMontant(calculsList, totalFraisDevisSansSuite, 'Frais de devis sans suite');
//     afficherMontant(calculsList, totalFraisFinanciers, 'Frais Financiers');
//     afficherMontant(calculsList, totalFraisGroupe, 'Frais de Groupe');

//     // Calcul du prix de revient total
//     const totalPrixRevient =
//       Number(totalTousPostes) +
//       Number(totalFraisDevisSansSuite) +
//       Number(totalFraisFinanciers) +
//       Number(totalFraisGroupe);
//     afficherMontant(calculsList, totalPrixRevient, 'Prix de revient');

//     // Création de la marge
//     const margeVoulue = creerElement('div', ['styleCalculs']);
//     const margeVoulueP = creerElement('p', ['textCalculs'], 'Marge voulue');
//     const montantMargeVoulue = creerElement('input', ['montantCalculs']);
//     montantMargeVoulue.type = 'number';
//     montantMargeVoulue.placeholder = '%';
//     margeVoulue.appendChild(margeVoulueP);
//     margeVoulue.appendChild(montantMargeVoulue);

//     calculsList.appendChild(margeVoulue);

//     // Calcul du prix de vente estimé
//     const prixVenteEstimee = creerElement('div', ['styleCalculs']);
//     const prixVenteEstimeeP = creerElement('p', ['textCalculs'], 'Prix de vente estimée');
//     const montantPrixVenteEstimee = creerElement('p', ['montantCalculs']);
//     prixVenteEstimee.appendChild(prixVenteEstimeeP);
//     prixVenteEstimee.appendChild(montantPrixVenteEstimee);

//     calculsList.appendChild(prixVenteEstimee);

//     // Calcul du prix de vente retenue
//     const prixVenteRetenue = creerElement('div', ['styleCalculs']);
//     const prixVenteRetenueP = creerElement('p', ['textCalculs'], 'Prix de vente retenue');
//     const montantPrixVenteRetenue = creerElement('input', ['montantCalculs', 'pvr']);
//     montantPrixVenteRetenue.type = 'text';

//     calculsList.appendChild(prixVenteRetenue);
//     prixVenteRetenue.appendChild(prixVenteRetenueP);
//     prixVenteRetenue.appendChild(montantPrixVenteRetenue);

//     // Calcul de la marge
//     const marge = creerElement('div', ['styleCalculs']);
//     const margeP = creerElement('p', ['textCalculs'], 'Marge');
//     const montantMarge = creerElement('p', ['montantCalculs']);
//     montantMarge.textContent = '%';

//     marge.appendChild(margeP);
//     marge.appendChild(montantMarge);
//     calculsList.appendChild(marge);

//     // Ecouteur pour la marge voulue
//     montantMargeVoulue.addEventListener('input', () => {
//       const valeurMarge = parseFloat(montantMargeVoulue.value);
//       if (!isNaN(valeurMarge)) {
//         const prixVenteEsti = totalPrixRevient * (1 + valeurMarge / 100);
//         montantPrixVenteEstimee.textContent = `${prixVenteEsti.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €`;
//       } else {
//         montantPrixVenteEstimee.textContent = '';
//       }
//     });

//     // Ecouteur pour le prix de vente retenue
//     montantPrixVenteRetenue.addEventListener('input', () => {
//       let valeur = montantPrixVenteRetenue.value.replace(/\s/g, '').replace(/[^0-9.]/g, '');
//       const prixRetenu = parseFloat(valeur);
//       const prixRevient = totalPrixRevient;

//       if (!isNaN(prixRevient) && prixRevient !== 0 && !isNaN(prixRetenu)) {
//         const margeFinale = ((prixRetenu - prixRevient) / prixRevient) * 100;
//         montantMarge.textContent = `${margeFinale.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} %`;
//         montantPrixVenteRetenue.value = prixRetenu.toLocaleString('fr-FR');
//       } else {
//         montantMarge.textContent = '%';
//       }
//     });
//   });
