import { getPostData } from '../postes/getPostesData.js';
import { openPostModal } from '../postes/openPostModal.js';
import {
  fraisDss,
  fraisFinanciers,
  fraisGroupe,
  fraisTotalAchat,
  totalGarantieEnsemblier,
  totalParContext,
  updateMargeFinale,
  updatePrixVenteEsti,
  updateTotalPR,
  updateTotalPRI,
} from './calculsFap.js';

export async function fetchFap() {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  const ra_id = urlParams.get('ra_id');

  try {
    const postes = await getPostData(devis_id, ra_id);

    const contenuPost = document.createElement('div');
    contenuPost.id = 'contenuPost';

    Object.entries(postes).forEach(([libelle, groupe]) => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('postDiv');

      postDiv.addEventListener('click', e => {
        e.preventDefault();
        openPostModal(groupe[0], groupe);
      });

      const postLibelleFap = document.createElement('p');
      postLibelleFap.classList.add('postLibelleFap');
      postLibelleFap.textContent = `Libellé : ${libelle}`;

      const totalMontant = groupe.reduce((sum, p) => sum + (parseFloat(p.TOTAL) || 0), 0);

      const totalPostFap = document.createElement('div');
      totalPostFap.classList.add('totalPostFap');
      totalPostFap.textContent = ` ${totalMontant.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €`;

      postDiv.append(postLibelleFap, totalPostFap);
      contenuPost.appendChild(postDiv);
    });

    const totalParCtx = totalParContext(Object.values(postes).flat());
    const totalAchat = totalParCtx['ACHATS'] || 0;
    const totalMdvr = totalParCtx['MAIN_DOEUVRE'] || 0;
    const totalFraisC = totalParCtx['CHANTIER'] || 0;

    const allPostes = Object.values(postes).flat();

    let totalAchatFrais = 0;
    try {
      totalAchatFrais = await fraisTotalAchat(allPostes);
    } catch (e) {
      console.error("Erreur lors du calcul des frais d'achat :", e);
    }

    console.log('total des achats ', totalAchat);
    console.log('total de la main doeuvre ', totalMdvr);
    console.log('total des frais de chantier ', totalFraisC);

    // Container pour les prix et les calculs de marge

    const containerPrix = document.createElement('div');
    containerPrix.classList.add('containerPrix');

    // Div total de la main d'oeuvre
    const mdvr = document.createElement('div');
    mdvr.classList.add('mdvr');
    mdvr.classList.add('divFap');

    const mdvrP = document.createElement('p');
    mdvrP.classList.add('divTextFap');
    mdvrP.textContent = "Total main d'oeuvre";

    const mdvrTotal = document.createElement('div');
    mdvrTotal.textContent = `${totalMdvr.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    mdvrTotal.classList.add('divTotal');
    mdvrTotal.classList.add('divTotal_2');

    mdvr.append(mdvrP, mdvrTotal);

    // Div total des achats
    const achat = document.createElement('div');
    achat.classList.add('achat');
    achat.classList.add('divFap');

    const achatP = document.createElement('p');
    achatP.classList.add('divTextFap');
    achatP.textContent = 'Total achats';

    const achatTotal = document.createElement('div');
    achatTotal.textContent = `${totalAchat.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    achatTotal.classList.add('divTotal');
    achatTotal.classList.add('divTotal_2');

    achat.append(achatP, achatTotal);

    // Div Total Frais Achats
    const fraisAchats = document.createElement('div');
    fraisAchats.classList.add('fraisAchats');
    fraisAchats.classList.add('divFap');

    const fraisAchatsP = document.createElement('p');
    fraisAchatsP.classList.add('divTextFap');
    fraisAchatsP.textContent = "Frais d'achats";

    const fraisAchatsTotal = document.createElement('div');
    fraisAchatsTotal.textContent = `${totalAchatFrais.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
    fraisAchatsTotal.classList.add('divTotal');
    fraisAchatsTotal.classList.add('divTotal_2');

    fraisAchats.append(fraisAchatsP, fraisAchatsTotal);

    // Div total Frais chantier
    const fraisChantier = document.createElement('div');
    fraisChantier.classList.add('fraisChantier');
    fraisChantier.classList.add('divFap');

    const fraisChantierP = document.createElement('p');
    fraisChantierP.classList.add('divTextFap');
    fraisChantierP.textContent = 'Total frais de chantier';

    const fraisChantierTotal = document.createElement('div');
    fraisChantierTotal.textContent = `${totalFraisC.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    fraisChantierTotal.classList.add('divTotal');
    fraisChantierTotal.classList.add('divTotal_2');

    fraisChantier.append(fraisChantierP, fraisChantierTotal);

    // Div Garantie ensemblier correspond a 2.5% du prix de vente retenu, elle est a ajouter au calcul
    const garantieE = document.createElement('div');
    garantieE.classList.add('garantieE');
    garantieE.classList.add('divFap');

    const garantieEP = document.createElement('p');
    garantieEP.classList.add('divTextFap');
    garantieEP.textContent = 'Garantie ensemblier';

    const garantieETotal = document.createElement('div');
    garantieETotal.textContent = '0 €';
    garantieETotal.classList.add('divTotal');
    garantieETotal.classList.add('divTotal_2');

    garantieE.append(garantieEP, garantieETotal);

    // Div Prix de revient intermédiaire
    const divPRI = document.createElement('div');
    divPRI.classList.add('divPRI');
    divPRI.classList.add('divFap');

    const divPriP = document.createElement('p');
    divPriP.classList.add('divTextFap');
    divPriP.textContent = 'Prix de revient intermédiaire';

    const divPriTotal = document.createElement('div');

    divPriTotal.classList.add('divTotal');
    divPriTotal.classList.add('divTotal_2');

    divPRI.append(divPriP, divPriTotal);

    divPriTotal.addEventListener('blur', async e => {
      const val = parseFloat(e.target.value.replace(/\s/g, '').replace(',', '.')) || 0;
      e.target.value =
        val.toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' €';
    });

    // Div Prix de vente retenu, a insérer par le responsable d'affaire

    const divPVR = document.createElement('div');
    divPVR.classList.add('divPVR');
    divPVR.classList.add('divFap');

    const divPvrP = document.createElement('p');
    divPvrP.classList.add('divTextFap');
    divPvrP.textContent = 'Prix de vente retenu';

    const divPvrTotal = document.createElement('input');
    divPvrTotal.placeholder = '€';
    divPvrTotal.id = 'divPvrTotal';
    divPvrTotal.style.flex = 1;
    divPvrTotal.addEventListener('blur', e => {
      const val = parseFloat(e.target.value.replace(/\s/g, '').replace(',', '.')) || 0;
      e.target.value =
        val.toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' €';
    });
    divPVR.append(divPvrP, divPvrTotal);

    // Div marge finale qui correspond entre la différence entre le prix de vente retenu et le prix de vente estimé
    const margeFinale = document.createElement('div');
    margeFinale.classList.add('margeFinale');
    margeFinale.classList.add('divFap');

    const margeFinaleP = document.createElement('p');
    margeFinaleP.classList.add('divTextFap');
    margeFinaleP.textContent = 'Marge';

    const margeFinaleTotal = document.createElement('div');
    margeFinaleTotal.classList.add('divTotal');
    margeFinaleTotal.classList.add('divTotal_2');

    // Calculate initial garantie ensemblier if prix de vente retenu is already entered

    try {
      const pvrInit = parseFloat(divPvrTotal.value.replace(/\s/g, '').replace(',', '.')) || 0;
      (await totalGarantieEnsemblier(pvrInit, garantieETotal)) || 0;
    } catch (e) {
      console.error('Erreur lors du calcul initial de la garantie ensemblier :', e);
    }

    // Appel updateTotalPRI après déclaration des éléments nécessaires
    const totalPri = await updateTotalPRI(
      garantieETotal,
      totalAchat,
      totalMdvr,
      totalFraisC,
      totalAchatFrais,
      divPriTotal,
      divPvrTotal,
      margeFinaleTotal
    );

    divPriTotal.textContent = `${totalPri.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

    divPvrTotal.addEventListener('input', e => {
      const pvRetenu = e.target.value;
      updateMargeFinale(pvRetenu, totalPri, margeFinaleTotal);
    });

    divPvrTotal.addEventListener('blur', async e => {
      const val = parseFloat(e.target.value.replace(/\s/g, '').replace(',', '.')) || 0;
      e.target.value =
        val.toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' €';

      await totalGarantieEnsemblier(val, garantieETotal);

      const newTotalPri = updateTotalPRI(
        garantieETotal,
        totalAchat,
        totalMdvr,
        totalFraisC,
        totalAchatFrais,
        divPriTotal,
        divPvrTotal,
        margeFinaleTotal
      );

      const totalPR = await updateTotalPR(allPostes, newTotalPri, divPrTotal);

      updateMargeFinale(val, newTotalPri, margeFinaleTotal);

      divPrTotal.textContent =
        totalPR.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        ' €';

      const marge = parseFloat(margeVoulueValue.value) || 0;
      updatePrixVenteEsti(totalPR, marge, divPveTotal);
      console.log('Je cherche val ', val);

      updateMargeFinale(val, totalPR, margeFinaleTotal);
    });

    margeFinale.append(margeFinaleP, margeFinaleTotal);

    // Div Groupement de frais
    const divFrais = document.createElement('div');
    divFrais.classList.add('divGrpFrais');
    divFrais.classList.add('divFap');

    // Frais de devis sans suite

    let totalFraisDss = { totalDss: 0 };
    try {
      totalFraisDss = await fraisDss(allPostes, totalPri);
    } catch (e) {
      console.error("Erreur lors du calcul des frais d'achat :", e);
    }
    const divFraisDSS = document.createElement('div');
    divFraisDSS.classList.add('divFrais');
    divFraisDSS.classList.add('divFap');

    const divFraisDssP = document.createElement('p');
    divFraisDssP.classList.add('divTextFap');
    divFraisDssP.textContent = 'Frais de devis sans suite';

    const divFraisDssTotal = document.createElement('div');
    divFraisDssTotal.textContent = `${totalFraisDss.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    divFraisDssTotal.classList.add('divTotal');
    divFraisDssTotal.classList.add('divTotal_2');

    divFraisDSS.append(divFraisDssP, divFraisDssTotal);

    // Frais Financiers

    let totalFraisFinancier = { totalFinancier: 0 };
    try {
      totalFraisFinancier = await fraisFinanciers(allPostes, totalPri);
    } catch (e) {
      console.error("Erreur lors du calcul des frais d'achat :", e);
    }
    const divFraisFinanciers = document.createElement('div');
    divFraisFinanciers.classList.add('divFrais');
    divFraisFinanciers.classList.add('divFap');

    const divFraisFinanciersP = document.createElement('p');
    divFraisFinanciersP.classList.add('divTextFap');
    divFraisFinanciersP.textContent = 'Frais Financiers';

    const divFraisFinanciersTotal = document.createElement('div');
    divFraisFinanciersTotal.textContent = `${totalFraisFinancier.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    divFraisFinanciersTotal.classList.add('divTotal');
    divFraisFinanciersTotal.classList.add('divTotal_2');

    divFraisFinanciers.append(divFraisFinanciersP, divFraisFinanciersTotal);

    // Frais de groupe

    let totalFraisDeGroupe = { totalGroupe: 0 };
    try {
      totalFraisDeGroupe = await fraisGroupe(allPostes, totalPri);
    } catch (e) {
      console.error('Erreur lors du calcul des frais de groupe : ', e);
    }
    const divFraisGroupe = document.createElement('div');
    divFraisGroupe.classList.add('divFrais');
    divFraisGroupe.classList.add('divFap');

    const divFraisGroupeP = document.createElement('p');
    divFraisGroupeP.classList.add('divTextFap');
    divFraisGroupeP.textContent = 'Frais de Groupe';

    const divFraisGroupeTotal = document.createElement('div');

    divFraisGroupeTotal.classList.add('divTotal');
    divFraisGroupeTotal.classList.add('divTotal_2');
    divFraisGroupeTotal.textContent = `${totalFraisDeGroupe.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    divFraisGroupe.append(divFraisGroupeP, divFraisGroupeTotal);

    // Div Prix de revient

    const divPr = document.createElement('div');
    divPr.classList.add('divPr');
    divPr.classList.add('divFap');

    const divPrP = document.createElement('p');
    divPrP.classList.add('divTextFap');
    divPrP.textContent = 'Prix de revient';

    const divPrTotal = document.createElement('div');
    divPrTotal.classList.add('divTotal');
    divPrTotal.classList.add('divTotal_2');

    const totalPR = await updateTotalPR(allPostes, totalPri, divPrTotal);

    divPr.append(divPrP, divPrTotal);

    // Marge Voulue
    const margeVoulue = document.createElement('div');
    margeVoulue.classList.add('margeVoulue');
    margeVoulue.classList.add('divFap');

    const margeVoulueP = document.createElement('p');
    margeVoulueP.classList.add('divTextFap');
    margeVoulueP.textContent = 'Marge Voulue';

    const margeVoulueValue = document.createElement('input');
    margeVoulueValue.type = 'number';
    margeVoulueValue.placeholder = '%';
    margeVoulueValue.id = 'margeVoulue';
    margeVoulueValue.style.flex = 1;

    margeVoulue.append(margeVoulueP, margeVoulueValue);

    // Div Prix de vente estimé, calculer avec la marge voulu par rapport au prix de revient inter

    const divPVE = document.createElement('div');
    divPVE.classList.add('divPVE');
    divPVE.classList.add('divFap');

    const divPveP = document.createElement('p');
    divPveP.classList.add('divTextFap');
    divPveP.textContent = 'Prix de vente estimé';

    const divPveTotal = document.createElement('div');
    divPveTotal.classList.add('divTotal');
    divPveTotal.classList.add('divTotal_2');

    margeVoulueValue.addEventListener('input', () => {
      const marge = parseFloat(margeVoulueValue.value) || 0;
      updatePrixVenteEsti(totalPR, marge, divPveTotal);
    });
    divPVE.append(divPveP, divPveTotal);

    // Appends & appendChild
    divFrais.append(divFraisDSS, divFraisFinanciers, divFraisGroupe);
    containerPrix.append(
      mdvr,
      achat,
      fraisAchats,
      fraisChantier,
      garantieE,
      divPRI,
      divFrais,
      divPr,
      margeVoulue,
      divPVE,
      divPVR,
      margeFinale
    );

    const main = document.querySelector('main');
    main.append(contenuPost, containerPrix);
  } catch (error) {
    console.error('Erreur lors de la récupération des postes :', error);
  }
}
