import { fetchFap } from './fap/fetchFap.js';
import { getFapData } from './fap/getFap.js';

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
      if (garantieElem) garantieElem.innerText = fap.data.GARANTIE_ENSEMBLIER;

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
    } else {
      await fetchFap(); // affichage d’un formulaire vide (création)
    }
  } else {
    alert("Aucun devis_id trouvé dans l'URL");
  }
}
init();
