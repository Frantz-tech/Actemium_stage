import { fetchFraisGlobaux } from './get/fetchFrais.js';

export function totalParContext(postes) {
  const totalCtx = {};
  postes.forEach(poste => {
    const context = poste.CONTEXT?.trim();
    const total = parseFloat(poste.TOTAL) || 0;
    if (!totalCtx[context]) {
      totalCtx[context] = 0;
    }

    totalCtx[context] += total;
  });
  console.log('total par context :', totalCtx);
  return totalCtx;
}

export async function fraisTotalAchat(postes) {
  const taux = await fetchFraisGlobaux();
  console.log('Taux de frais_globaux récupérés avec succes : ', taux);

  const tauxFourniture = taux['frais_achat_fourniture'] || 0;
  const tauxSousTraitance = taux['frais_achat_St_Etudes'] || 0;

  let totalFourniture = 0;
  let totalBonsChantiers = 0;
  let totalSousTraitance = 0;
  let totalEtudes = 0;

  postes.forEach(poste => {
    const codeLibelle = poste.CODE_LIBELLE?.trim().toUpperCase();
    const total = parseFloat(poste.TOTAL) || 0;
    const contextPoste = poste.CONTEXT?.trim().toUpperCase();

    if (codeLibelle === 'FOURNITURES') {
      totalFourniture += total;
    }
    if (codeLibelle === 'BONS DE CHANTIERS') {
      totalBonsChantiers += total;
    }

    if (contextPoste === 'CHANTIER' && codeLibelle === 'SOUS-TRAITANCE EXTERNE') {
      totalSousTraitance += total;
    }
    if (contextPoste === 'CHANTIER' && codeLibelle === 'ETUDES') {
      totalEtudes += total;
    }
  });

  const fraisFourniture_BonsChantier = (totalFourniture + totalBonsChantiers) * tauxFourniture;
  const fraisSousTraitance_Etudes = (totalSousTraitance + totalEtudes) * tauxSousTraitance;
  const totalFraisAchat = fraisFourniture_BonsChantier + fraisSousTraitance_Etudes;

  return { totalFraisAchat, fraisFourniture_BonsChantier, fraisSousTraitance_Etudes };
}

export async function fraisDss(postes, prixRevientInter) {
  const taux = await fetchFraisGlobaux();
  const tauxDss = parseFloat(taux['frais_dss']) || 0;

  let totalSousTraitanceInterne = 0;
  postes.forEach(p => {
    const codeLibelle = p.CODE_LIBELLE?.trim().toUpperCase();
    const total = parseFloat(p.TOTAL) || 0;

    if (codeLibelle === 'SOUS-TRAITANCE INTERNE') {
      totalSousTraitanceInterne += total;
    }
  });
  const baseDSS = (parseFloat(prixRevientInter) || 0) - totalSousTraitanceInterne;
  const fraisDss = baseDSS * tauxDss;

  return fraisDss;
}

export async function fraisFinanciers(postes, prixRevientInter) {
  const taux = await fetchFraisGlobaux();
  const tauxFinancier = parseFloat(taux['frais_financiers']) || 0;

  const fraisFinancier = (parseFloat(prixRevientInter) || 0) * tauxFinancier;

  return fraisFinancier;
}

export async function fraisGroupe(postes, prixRevientInter) {
  const taux = await fetchFraisGlobaux();
  const tauxGroupe = parseFloat(taux['frais_de_groupe']) || 0;

  let totalSousTraitanceInterne = 0;
  postes.forEach(p => {
    const codeLibelle = p.CODE_LIBELLE?.trim().toUpperCase();
    const total = parseFloat(p.TOTAL) || 0;

    if (codeLibelle === 'SOUS-TRAITANCE INTERNE') {
      totalSousTraitanceInterne += total;
    }
  });
  const baseGroupe = (parseFloat(prixRevientInter) || 0) - totalSousTraitanceInterne;
  const fraisGroupe = baseGroupe * tauxGroupe;

  return fraisGroupe;
}

export async function updatePrixVenteEsti(prixRevient, marge, totalPve) {
  try {
    const pve = prixRevient / (1 - marge / 100);

    totalPve.textContent = `${Math.round(pve).toLocaleString('fr-FR')} €`;
    return pve;
  } catch (error) {
    console.error('Erreur lors du calcul du pve : ', error);
  }
}

export function updateMargeFinale(prixVenteRetenu, prixRevient, marge) {
  try {
    const pv = parseFloat(prixVenteRetenu.toString().replace(/\s/g, '').replace(',', '.'));
    const pr = parseFloat(prixRevient) || 0;

    if (!pv || !pr || isNaN(pv) || isNaN(pr) || pr === 0) {
      marge.textContent = ' - %';
      return;
    }

    const margePercent = (1 - pr / pv) * 100;

    marge.textContent = ` ${margePercent.toFixed(2)} %`;
    return margePercent;
  } catch (e) {
    console.error('Erreur lors du calcul de la marge finale :', e);
  }
}

export async function totalGarantieEnsemblier(prixVenteRetenu, garantie_ensemblier) {
  try {
    const pvr = parseFloat(prixVenteRetenu.toString().replace(/\s/g, '').replace(',', '.')) || 0;
    if (!pvr || isNaN(pvr) || Number(pvr) < 150000) {
      garantie_ensemblier.textContent = ' 0 €';
      console.log('Le prix de vente retenu est invalide ou inférieur à 150 000 €');
      return;
    }
    const taux = await fetchFraisGlobaux();
    const fraisGE = parseFloat(taux['garantie_e']) || 0;
    const ge = pvr * fraisGE;
    garantie_ensemblier.textContent = `${Math.round(ge).toLocaleString('fr-FR')} €`;

    return ge;
  } catch (error) {
    console.error('Erreur lors du calcul de la garantie ensemblier', error);
    throw Error('Erreur lors du calcul de la GE');
  }
}

export function updateTotalPRI(
  garantieETotal,
  totalAchat,
  totalMdvr,
  totalFraisC,
  totalAchatFrais,
  divPriTotal,
  divPvrTotal,
  margeFinaleTotal
) {
  const garantie =
    parseFloat(garantieETotal.textContent.replace(/\s/g, '').replace('€', '').replace(',', '.')) ||
    0;

  const totalPri = totalAchat + totalMdvr + totalFraisC + totalAchatFrais + garantie;

  divPriTotal.textContent = `${totalPri.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;

  const pvRetenu = divPvrTotal.value.replace(/\s/g, '').replace('€', '').replace(',', '.');
  const val = parseFloat(pvRetenu);
  if (!isNaN(val)) updateMargeFinale(val, totalPri, margeFinaleTotal);

  return totalPri;
}

export async function updateTotalPR(postes, totalPRI, divPrTotal) {
  const totalFraisDss = await fraisDss(postes, totalPRI);
  const totalFF = await fraisFinanciers(postes, totalPRI);
  const totalGroupe = await fraisGroupe(postes, totalPRI);

  const totalPR = totalPRI + totalFraisDss + totalGroupe + totalFF;

  divPrTotal.textContent = `${Math.round(totalPR).toLocaleString('fr-FR')} €`;
  return totalPR;
}

export async function updateFrais(
  postes,
  totalPr,
  divFraisDSS,
  divFraisFinanciers,
  divFraisGroupe
) {
  const newFraisDSS = await fraisDss(postes, totalPr);
  const newFraisFinanciers = await fraisFinanciers(postes, totalPr);
  const newFraisGroupe = await fraisGroupe(postes, totalPr);

  // Mise à jour des divs individuelles

  divFraisDSS.textContent = `${Math.round(newFraisDSS).toLocaleString('fr-FR')} €`;
  divFraisFinanciers.textContent = `${Math.round(newFraisFinanciers).toLocaleString('fr-FR')} €`;
  divFraisGroupe.textContent = `${Math.round(newFraisGroupe).toLocaleString('fr-FR')} €`;
  console.log('Frais devis Sans suite :', newFraisDSS);
  console.log('Frais Financiers :', newFraisFinanciers);
  console.log('Frais de Groupe :', newFraisGroupe);
  return { newFraisDSS, newFraisFinanciers, newFraisGroupe };
}
