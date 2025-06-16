import { fetchFap } from './fap/fetchFap.js';
import { getFapData } from './fap/getFap.js';
import { patchFap } from './patch/patchFap.js';

document.querySelector('h1').innerText = 'FAP ACTEMIUM';

const params = new URLSearchParams(window.location.search);
const devis_id = params.get('devis_id');
async function init() {
  if (devis_id) {
    const fap = await getFapData(devis_id);

    if (fap && fap.data && fap.data.FAP_ID) {
      console.log('FAP existante récupérée :', fap);
      console.log('FAPID = ', fap.data.FAP_ID);
      await fetchFap(fap.data); // affichage des données existantes

      const garantieElem = document.querySelector('#garantieE');
      if (garantieElem)
        garantieElem.innerText = `${parseFloat(fap.data.GARANTIE_ENSEMBLIER).toLocaleString('fr-FR')} €`;

      const margeElem = document.querySelector('#margeVoulue');
      if (margeElem) margeElem.value = fap.data.MARGE_VOULUE;

      const pveElem = document.querySelector('#pveTotal');
      if (pveElem) pveElem.innerText = fap.data.PRIX_VENTE_ESTIME;

      const divPvrTotalElem = document.querySelector('#divPvrTotal');
      if (divPvrTotalElem) {
        divPvrTotalElem.value = fap.data.PRIX_VENTE_RETENUE;
      }
      const margeFinaleElem = document.querySelector('#margeFinale');
      if (margeFinaleElem) margeFinaleElem.innerText = fap.data.MARGE;

      const btnPatch = document.querySelector('.btnPatch');
      btnPatch.classList.remove('hidePatch');

      const btnValider = document.querySelector('.btnValider');
      btnValider.classList.add('hidePatch');
      if (btnPatch) {
        btnPatch.addEventListener('click', () => {
          const margeVoulueElem = document.querySelector('#margeVoulue');
          const garantieEElem = document.querySelector('#garantieE');
          const priElem = document.getElementById('pri');
          const fdssElem = document.getElementById('fraisDss');
          const fraisFElem = document.getElementById('fraisF');
          const fraisGElem = document.getElementById('fraisG');
          const prixRElem = document.getElementById('totalPr');
          const pveElem = document.getElementById('pve');
          const pvrElem = document.getElementById('divPvrTotal');
          const margeFinaleElem = document.getElementById('margeF');

          const garantieE = garantieEElem.textContent.replace(/\s/g, '').replace('€', '');
          const pri = priElem.textContent.replace(/\s/g, '').replace('€', '');
          const fdss = fdssElem.textContent.replace(/\s/g, '').replace('€', '');
          const fraisF = fraisFElem.textContent.replace(/\s/g, '').replace('€', '');
          const fraisG = fraisGElem.textContent.replace(/\s/g, '').replace('€', '');
          const prixR = prixRElem.textContent.replace(/\s/g, '').replace('€', '');
          const pve = pveElem.textContent.replace(/\s/g, '').replace('€', '');
          const pvr = pvrElem.value.replace(/\s/g, '').replace('€', '');
          const margeVoulue = margeVoulueElem.value.replace(/\s/g, '').replace('%', '');
          const margeFinale = margeFinaleElem.textContent
            .replace(/\s/g, '')
            .replace('€', '')
            .replace(',', '.');

          const dataToPatch = {
            FAP_ID: fap.data.FAP_ID,
            GARANTIE_ENSEMBLIER: parseFloat(garantieE.replace(',', '.')),
            PRIX_REVIENT_INTER: parseFloat(pri.replace(',', '.')),
            FRAIS_DEVIS_SANS_SUITE: parseFloat(fdss),
            FRAIS_DE_GROUPE: parseFloat(fraisG),
            FRAIS_FINANCIERS: parseFloat(fraisF),
            PRIX_REVIENT: parseFloat(prixR),
            MARGE_VOULUE: parseFloat(margeVoulue.replace(',', '.')),
            PRIX_VENTE_ESTIME: parseFloat(pve),
            PRIX_VENTE_RETENUE: parseFloat(pvr),
            MARGE: parseFloat(margeFinale.replace(',', '.').replace('%', '')),
          };
          console.log('donnée a modifier ', dataToPatch);

          patchFap(devis_id, dataToPatch);
        });
      }
    } else {
      await fetchFap(); // affichage d’un formulaire vide (création)
    }
  } else {
    alert("Aucun devis_id trouvé dans l'URL");
  }
}
init();
