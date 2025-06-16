import { postData } from '../post/postData.js';
import { getPostData } from '../postes/getPostesData.js';
import { openPostModal } from '../postes/openPostModal.js';
import {
  fraisDss,
  fraisFinanciers,
  fraisGroupe,
  fraisTotalAchat,
  totalGarantieEnsemblier,
  totalParContext,
  updateFrais,
  updateMargeFinale,
  updatePrixVenteEsti,
  updateTotalPR,
  updateTotalPRI,
} from './calculsFap.js';
import { detailModal } from './detailModal.js';

export async function fetchFap(fapData = {}) {
  const urlParams = new URLSearchParams(window.location.search);
  const devis_id = urlParams.get('devis_id');
  const ra_id = urlParams.get('ra_id');

  try {
    document.querySelector('h1').innerText = 'FAP ACTEMIUM';

    const btnValider = document.createElement('button');
    btnValider.classList.add('btnValider');
    btnValider.textContent = `Valider`;

    const btnExporterPDF = document.createElement('button');
    btnExporterPDF.classList.add('btnExporter');
    btnExporterPDF.textContent = `Exporter PDF`;

    const btnPatch = document.createElement('button');
    btnPatch.classList.add('hidePatch');
    btnPatch.classList.add('btnPatch');
    btnPatch.textContent = `Mettre à jour`;
    const buttons = document.createElement('div');

    buttons.classList.add('buttons');

    const postes = await getPostData(devis_id);

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
    let fraisSTEtudes = 0;
    let totalFraisFourniture_BC = 0;
    try {
      const { totalFraisAchat, fraisSousTraitance_Etudes, fraisFourniture_BonsChantier } =
        await fraisTotalAchat(allPostes);
      totalAchatFrais = totalFraisAchat;
      fraisSTEtudes = fraisSousTraitance_Etudes;
      totalFraisFourniture_BC = fraisFourniture_BonsChantier;
      console.log('1 - total Frais sous traitance externe + etude = ', fraisSTEtudes);
      console.log('2 - total Frais achat fourniture = ', totalFraisFourniture_BC);
      console.log('3 - total Frais achat = 1 + 2 ', totalAchatFrais);
    } catch (e) {
      console.error("Erreur lors du calcul des frais d'achat :", e);
    }

    // Container pour les prix et les calculs de marge
    const containerPrix = document.createElement('div');
    containerPrix.classList.add('containerPrix');

    // Div rassemblement des couts
    const voirCouts = document.createElement('div');
    voirCouts.classList.add('voirCouts');

    // Cacher les couts dans ce bloc par défaut
    const blocHideCouts = document.createElement('div');
    blocHideCouts.classList.add('blocHideCouts');
    blocHideCouts.classList.add('hidden');

    const blocHideCoutsP = document.createElement('p');
    blocHideCoutsP.classList.add('blocHideCoutsP');
    blocHideCoutsP.textContent = 'Voir les coûts';

    // Appelle de la fonction qui ouvre les couts lors du click
    blocHideCoutsP.addEventListener('click', () => {
      const isHidden = blocHideCouts.classList.contains('hidden');

      if (isHidden) {
        blocHideCouts.classList.remove('hidden');
        setTimeout(() => {
          blocHideCoutsP.textContent = 'Réduire';
          blocHideCoutsP.classList.add('active');
        }, 300);
      } else {
        blocHideCouts.classList.add('hidden');
        blocHideCoutsP.classList.remove('active');
        setTimeout(() => {
          blocHideCoutsP.textContent = 'Voir les coûts';
        }, 1000);
      }
    });
    // Div total de la main d'oeuvre
    const mdvr = document.createElement('div');
    mdvr.classList.add('mdvr');
    mdvr.classList.add('divFap');

    const mdvrP = document.createElement('p');
    mdvrP.classList.add('divTextFap');
    mdvrP.classList.add('textCout');
    mdvrP.textContent = "Total main d'oeuvre";

    const mdvrTotal = document.createElement('div');
    mdvrTotal.style.cursor = 'pointer';
    mdvrTotal.textContent = `${Math.round(totalMdvr).toLocaleString('fr-FR')} €`;
    mdvrTotal.classList.add('divTotal');
    mdvrTotal.classList.add('divTotal_2');
    mdvrTotal.classList.add('divTotal_Cout');

    // Ecouteur sur le total de la main d'oeuvre pour voir le détail

    mdvrTotal.addEventListener('click', () => {
      detailModal(devis_id, ra_id, 'MAIN_DOEUVRE');
    });

    mdvr.append(mdvrP, mdvrTotal);

    // Div total des achats
    const achat = document.createElement('div');
    achat.classList.add('achat');
    achat.classList.add('divFap');

    const achatP = document.createElement('p');
    achatP.classList.add('divTextFap');
    achatP.classList.add('textCout');

    achatP.textContent = 'Total achats';

    const achatTotal = document.createElement('div');
    achatTotal.style.cursor = 'pointer';
    achatTotal.textContent = `${Math.round(totalAchat).toLocaleString('fr-FR')} €`;
    achatTotal.classList.add('divTotal');
    achatTotal.classList.add('divTotal_2');
    achatTotal.classList.add('divTotal_Cout');

    // Ecouteur sur le total des Achats pour voir le détail des achats

    achatTotal.addEventListener('click', () => {
      detailModal(devis_id, ra_id, 'ACHATS');
    });

    achat.append(achatP, achatTotal);

    // Div rassemblement des frais
    const voirFrais = document.createElement('div');
    voirFrais.classList.add('voirFrais');

    // Cacher les frais dans ce bloc par défaut
    const blocHideFrais = document.createElement('div');
    blocHideFrais.classList.add('blocHideFrais');
    blocHideFrais.classList.add('hidden');

    const blocHideFraisP = document.createElement('p');
    blocHideFraisP.classList.add('blocHideCoutsP');
    blocHideFraisP.textContent = 'Voir les frais';

    // Appelle de la fonction qui ouvre les couts lors du click
    blocHideFraisP.addEventListener('click', () => {
      const isHidden = blocHideFrais.classList.contains('hidden');

      if (isHidden) {
        blocHideFrais.classList.remove('hidden');
        setTimeout(() => {
          blocHideFraisP.textContent = 'Réduire';
          blocHideFraisP.classList.add('active');
        }, 300);
      } else {
        blocHideFrais.classList.add('hidden');
        blocHideFraisP.classList.remove('active');
        setTimeout(() => {
          blocHideFraisP.textContent = 'Voir les frais';
        }, 1000);
      }
    });
    // Div Total Frais Achats
    const fraisAchats = document.createElement('div');
    fraisAchats.classList.add('fraisAchats');
    fraisAchats.classList.add('divFap');

    const fraisAchatsP = document.createElement('p');
    fraisAchatsP.classList.add('divTextFap');
    fraisAchatsP.classList.add('textCout');

    fraisAchatsP.textContent = `Total frais d'achats ( frais achat fourniture ${Math.round(totalFraisFourniture_BC).toLocaleString('fr-FR')} € + (frais achat sous traitance + études ${fraisSTEtudes} €) )`;
    const fraisAchatsTotal = document.createElement('div');
    fraisAchatsTotal.textContent = `${Math.round(totalAchatFrais).toLocaleString('fr-FR')} €`;
    fraisAchatsTotal.classList.add('divTotal');
    fraisAchatsTotal.classList.add('divTotal_2');
    fraisAchatsTotal.classList.add('divTotal_Cout');

    fraisAchats.append(fraisAchatsP, fraisAchatsTotal);

    // Div total Frais chantier
    const fraisChantier = document.createElement('div');
    fraisChantier.classList.add('fraisChantier');
    fraisChantier.classList.add('divFap');

    const fraisChantierP = document.createElement('p');
    fraisChantierP.classList.add('divTextFap');
    fraisChantierP.classList.add('textCout');

    fraisChantierP.textContent = 'Total frais de chantier';

    const fraisChantierTotal = document.createElement('div');
    fraisChantierTotal.style.cursor = 'pointer';
    fraisChantierTotal.textContent = `${Math.round(totalFraisC).toLocaleString('fr-FR')} €`;
    fraisChantierTotal.classList.add('divTotal');
    fraisChantierTotal.classList.add('divTotal_2');
    fraisChantierTotal.classList.add('divTotal_Cout');

    // Ecouteur sur le total du frais Chantier
    fraisChantierTotal.addEventListener('click', () => {
      detailModal(devis_id, ra_id, 'CHANTIER');
    });

    fraisChantier.append(fraisChantierP, fraisChantierTotal);

    // Div Garantie ensemblier correspond a 2.5% du prix de vente retenu, elle est a ajouter au calcul
    const garantieE = document.createElement('div');
    garantieE.classList.add('garantieE');
    garantieE.classList.add('divFap');

    const garantieEP = document.createElement('p');
    garantieEP.classList.add('divTextFap');
    garantieEP.textContent = 'Garantie ensemblier';

    const garantieETotal = document.createElement('div');
    garantieETotal.id = 'garantieE';
    garantieETotal.textContent =
      fapData.GARANTIE_ENSEMBLIER !== undefined && fapData.GARANTIE_ENSEMBLIER !== null
        ? `${parseFloat(fapData.GARANTIE_ENSEMBLIER).toLocaleString('fr-FR')} €`
        : '0 €';
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
    divPriTotal.id = 'pri';
    divPriTotal.classList.add('divTotal');
    divPriTotal.classList.add('divTotal_2');
    // Champ numérique/textuel, appliquer la logique de test existence
    divPriTotal.textContent =
      fapData.PRI !== undefined && fapData.PRI !== null
        ? `${parseFloat(fapData.PRI).toLocaleString('fr-FR')} €`
        : '';
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
    divPvrTotal.value = fapData.PRIX_VENTE_RETENUE ?? '';
    divPvrTotal.addEventListener('blur', e => {
      const val = parseFloat(e.target.value.replace(/\s/g, '').replace(',', '.')) || 0;
      e.target.value = Math.round(val).toLocaleString('fr-FR') + ' €';
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
    margeFinaleTotal.id = 'margeF';
    margeFinaleTotal.classList.add('divTotal');
    margeFinaleTotal.classList.add('divTotal_2');
    margeFinaleTotal.textContent =
      fapData.MARGE !== undefined && fapData.MARGE !== null
        ? `${parseFloat(fapData.MARGE).toLocaleString('fr-FR')} €`
        : '';

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
      e.target.value = `${Math.round(val).toLocaleString('fr-FR') + ' €'}`;

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

      await updateFrais(
        allPostes,
        newTotalPri,
        divFraisDssTotal,
        divFraisFinanciersTotal,
        divFraisGroupeTotal
      );
      updateMargeFinale(val, newTotalPri, margeFinaleTotal);
      updateMargeFinale(val, totalPR, margeFinaleTotal);

      divPrTotal.textContent =
        totalPR.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        ' €';

      const marge = parseFloat(margeVoulueValue.value) || 0;
      updatePrixVenteEsti(totalPR, marge, divPveTotal);
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
    divFraisDssP.classList.add('textCout');
    divFraisDssP.textContent = 'Frais de devis sans suite';

    const divFraisDssTotal = document.createElement('div');
    divFraisDssTotal.textContent = `${Math.round(totalFraisDss).toLocaleString('fr-FR')} €`;
    divFraisDssTotal.id = 'fraisDss';
    divFraisDssTotal.classList.add('divTotal');
    divFraisDssTotal.classList.add('divTotal_2');
    divFraisDssTotal.classList.add('divTotal_Cout');

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
    divFraisFinanciersP.classList.add('textCout');
    divFraisFinanciersP.textContent = 'Frais Financiers';

    const divFraisFinanciersTotal = document.createElement('div');
    divFraisFinanciersTotal.id = 'fraisF';
    divFraisFinanciersTotal.textContent = `${Math.round(totalFraisFinancier).toLocaleString('fr-FR')} €`;
    divFraisFinanciersTotal.classList.add('divTotal');
    divFraisFinanciersTotal.classList.add('divTotal_2');
    divFraisFinanciersTotal.classList.add('divTotal_Cout');

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
    divFraisGroupeP.classList.add('textCout');
    divFraisGroupeP.textContent = 'Frais de Groupe';

    const divFraisGroupeTotal = document.createElement('div');
    divFraisGroupeTotal.id = 'fraisG';
    divFraisGroupeTotal.textContent = `${Math.round(totalFraisDeGroupe).toLocaleString('fr-FR')} €`;
    divFraisGroupeTotal.classList.add('divTotal');
    divFraisGroupeTotal.classList.add('divTotal_2');
    divFraisGroupeTotal.classList.add('divTotal_Cout');
    divFraisGroupe.append(divFraisGroupeP, divFraisGroupeTotal);

    // Div Prix de revient

    const divPr = document.createElement('div');
    divPr.classList.add('divPr');
    divPr.classList.add('divFap');

    const divPrP = document.createElement('p');
    divPrP.classList.add('divTextFap');
    divPrP.textContent = 'Prix de revient';

    const divPrTotal = document.createElement('div');
    divPrTotal.id = 'totalPr';
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
    margeVoulueValue.placeholder = '%';
    margeVoulueValue.id = 'margeVoulue';
    margeVoulueValue.style.flex = 1;
    margeVoulueValue.value = fapData.MARGE_VOULUE ?? '';
    margeVoulueValue.addEventListener('blur', e => {
      const val = e.target.value;
      e.target.value = parseFloat(val).toLocaleString('fr-FR') + ' %';
    });
    margeVoulue.append(margeVoulueP, margeVoulueValue);

    // Div Prix de vente estimé, calculer avec la marge voulu par rapport au prix de revient inter

    const divPVE = document.createElement('div');
    divPVE.classList.add('divPVE');
    divPVE.classList.add('divFap');

    const divPveP = document.createElement('p');
    divPveP.classList.add('divTextFap');
    divPveP.textContent = 'Prix de vente estimé';

    const divPveTotal = document.createElement('div');
    divPveTotal.id = 'pve';
    divPveTotal.textContent =
      fapData.PRIX_VENTE_ESTIME !== undefined && fapData.PRIX_VENTE_ESTIME !== null
        ? `${parseFloat(fapData.PRIX_VENTE_ESTIME).toLocaleString('fr-FR')} €`
        : '0 €';
    divPveTotal.classList.add('divTotal');
    divPveTotal.classList.add('divTotal_2');

    margeVoulueValue.addEventListener('input', () => {
      const marge = parseFloat(margeVoulueValue.value) || 0;
      updatePrixVenteEsti(totalPR, marge, divPveTotal);
    });
    divPVE.append(divPveP, divPveTotal);

    // Envoie vers la base de donnée
    btnValider.addEventListener('click', async () => {
      // Check si les champs sont bien rempli
      if (!margeVoulueValue.value || !divPvrTotal.value || divPvrTotal.value === '0 €') {
        alert('Veuillez remplir la marge et le prix de vente retenu avant de valider');
      }
      const margeFinaleNum =
        parseFloat(
          margeFinaleTotal.textContent.replace(/\s/g, '').replace('€', '').replace(',', '.')
        ) || 0;

      // Check si la marge est positive
      if (margeFinaleNum < 0) {
        alert('Le prix de vente retenu ne peut pas être inférieur au prix de revient');
      }
      // Récupération des éléments a envoyer
      const garantieEns = garantieETotal.textContent.replace(/\s/g, '').replace('€', '');
      const totalMd = mdvrTotal.textContent.replace(/\s/g, '').replace('€', '');
      const totalAch = achatTotal.textContent.replace(/\s/g, '').replace('€', '');
      const prixRevientInter = divPriTotal.textContent.replace(/\s/g, '').replace('€', '');
      const fraisDevisSS = divFraisDssTotal.textContent.replace(/\s/g, '').replace('€', '');
      const fraisFin = divFraisFinanciersTotal.textContent.replace(/\s/g, '').replace('€', '');
      const fraisGrp = divFraisGroupeTotal.textContent.replace(/\s/g, '').replace('€', '');
      const margeVoulueVal = margeVoulueValue.value.replace(/\s/g, '').replace('%', '');
      const prixRevt = divPrTotal.textContent.replace(/\s/g, '').replace('€', '');
      const totalFFBC = parseFloat(totalFraisFourniture_BC);
      const totalFSTE = parseFloat(fraisSTEtudes);
      const totalAF = fraisAchatsTotal.textContent.replace(/\s/g, '').replace('€', '');
      const totalFC = fraisChantierTotal.textContent.replace(/\s/g, '').replace('€', '');
      const prixVenteEsti = divPveTotal.textContent.replace(/\s/g, '').replace('€', '');
      const prixVenteRetenu = divPvrTotal.value.replace(/\s/g, '').replace('€', '');

      const dataFap = {
        devis_id,
        garantieE: garantieEns,
        total_Main_d_oeuvre: totalMd,
        total_achats: totalAch,
        total_frais_achat_fourniture: totalFFBC,
        total_frais_achat_ste: totalFSTE,
        total_frais_d_achat: totalAF,
        total_frais_chantier: totalFC,
        prix_revient_inter: prixRevientInter,
        frais_dss: fraisDevisSS,
        frais_financier: fraisFin,
        frais_groupe: fraisGrp,
        prix_revient: prixRevt,
        marge_voulue: margeVoulueVal,
        prix_vente_esti: prixVenteEsti,
        prix_vente_retenu: prixVenteRetenu,
        marge_finale: margeFinaleNum,
      };
      console.log('données à envoyer en bdd :', dataFap);

      try {
        const sendFap = await postData('http://localhost:3000/api/fap', dataFap);

        if (sendFap.ok) {
          alert('succes fap envoyé avec succes en base de donnée');
        }
      } catch (error) {
        console.error("Erreur lors de l'envoie de la fap");
        throw new Error('Erreur serveur ', error);
      }
    });
    // Appends & appendChild
    blocHideFrais.append(divFraisDSS, divFraisFinanciers, divFraisGroupe);
    voirFrais.append(blocHideFraisP, blocHideFrais);
    blocHideCouts.append(mdvr, achat, fraisAchats, fraisChantier);
    voirCouts.append(blocHideCoutsP, blocHideCouts);
    containerPrix.append(
      garantieE,
      voirCouts,
      divPRI,
      voirFrais,
      divPr,
      margeVoulue,
      divPVE,
      divPVR,
      margeFinale
    );

    const main = document.querySelector('main');
    buttons.append(btnValider, btnExporterPDF, btnPatch);

    main.append(buttons, contenuPost, containerPrix);
  } catch (error) {
    console.error('Erreur lors de la récupération des postes :', error);
  }
}
