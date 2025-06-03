import { fetchFraisGlobaux } from './fetchFrais.js';

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

  const tauxFourniture = taux['frais_achat_fourniture'] || 0;
  const tauxSousTraitance = taux['frais_achat_St_Etudes'] || 0;

  let totalFourniture = 0;
  let totalSousTraitance = 0;

  postes.forEach(poste => {
    const codeLibelle = poste.CODE_LIBELLE?.trim().toUpperCase();
    const total = parseFloat(poste.TOTAL) || 0;

    if (codeLibelle === 'FOURNITURES') {
      totalFourniture += total;
    }

    if (codeLibelle === 'SOUS-TRAITANCE EXTERNE' || codeLibelle === 'ETUDES') {
      totalSousTraitance += total;
    }
  });

  const fraisFourniture = totalFourniture * tauxFourniture;
  const fraisSousTraitance = totalSousTraitance * tauxSousTraitance;
  const totalFraisAchat = fraisFourniture + fraisSousTraitance;

  console.log('1- Frais achat fourniture :', fraisFourniture);
  console.log('2- Frais sous-traitance :', fraisSousTraitance);
  console.log("3 ( Somme de 1 & 2 ) Total frais d'achat :", totalFraisAchat);

  return totalFraisAchat;
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
  console.log('prixRevientInter reçu :', prixRevientInter);
  const baseDSS = (parseFloat(prixRevientInter) || 0) - totalSousTraitanceInterne;
  const fraisDss = baseDSS * tauxDss;
  console.log('Frais devis sans suite :', fraisDss);

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
  console.log('prixRevientInter reçu :', prixRevientInter);
  const baseGroupe = (parseFloat(prixRevientInter) || 0) - totalSousTraitanceInterne;
  const fraisGroupe = baseGroupe * tauxGroupe;
  console.log('Frais de groupe :', fraisGroupe);

  return fraisGroupe;
}

export function updatePrixVenteEsti(prixRevient, marge, totalPve) {
  try {
    const pve = prixRevient * (1 + marge / 100);

    totalPve.textContent = `${pve.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

    return pve;
  } catch (error) {
    console.error('Erreur lors du calcul du pve : ', error);
  }
}

export function updateMargeFinale(prixVenteRetenu, prixRevient, marge) {
  try {
    const pv = parseFloat(prixVenteRetenu) || 0;
    const pr = parseFloat(prixRevient) || 0;
    const margeValue = pv - pr;
    const margePercent = pr !== 0 ? (margeValue / pr) * 100 : 0;

    marge.textContent = ` ${margePercent.toFixed(2)} %`;
    return margePercent;
  } catch (e) {
    console.error('Erreur lors du calcul de la marge finale :', e);
  }
}
