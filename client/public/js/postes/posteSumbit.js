import { postData } from '../post/postData.js';

export async function sendPostes() {
  const params = new URLSearchParams(window.location.search);
  const devisId = params.get('devis_id');
  const ra_id = params.get('ra_id');

  if (!devisId) {
    console.error("Le paramètre 'devis_id' est manquant dans l'URL");
    return;
  }

  const libelle = document.querySelector('#libelleDevis')?.value || '';

  const sections = Array.from(document.querySelectorAll('.contenuSection'))
    .map(section => {
      const codeId = section.querySelector('.codeSection').value;
      const nbH = parseFloat(section.querySelector('.nbHeures').value) || 0;
      const taux =
        parseFloat(section.querySelector('.codeSection').selectedOptions[0].dataset.taux) || 0;
      const total = nbH * taux;

      return {
        DEVIS_ID: devisId,
        CODE_ID: codeId,
        LIBELLE: libelle,
        PRODUIT: null,
        QTE: 0,
        UNITE: null,
        NB_H: nbH,
        PRIX_U: taux,
        TOTAL: total,
      };
    })
    .filter(
      section =>
        section.CODE_ID && !['Code Section', 'undefined', null, ''].includes(section.CODE_ID)
    );

  const achats = Array.from(document.querySelectorAll('.contenuAchat'))
    .map(achat => {
      const codeId = achat.querySelector('.codeAchat').value;
      const nomProduit = achat.querySelector('.nomAchat').value;
      const qte = parseFloat(achat.querySelector('.qteAchat').value) || 0;
      const unite = achat.querySelector('.uniteAchat').value;
      const prixU = parseFloat(achat.querySelector('.prixUAchat').value) || 0;
      const total = prixU * qte;

      return {
        DEVIS_ID: devisId,
        CODE_ID: codeId,
        LIBELLE: libelle,
        PRODUIT: nomProduit,
        QTE: qte,
        UNITE: unite,
        NB_H: 0,
        PRIX_U: prixU,
        TOTAL: total,
      };
    })
    .filter(achat => achat.CODE_ID && achat.PRODUIT && achat.QTE > 0 && achat.PRIX_U > 0);

  const frais = Array.from(document.querySelectorAll('.contenuFraisChantier'))
    .map(frais => {
      const codeId = frais.querySelector('.codeFraisChantier').value;
      const nomProduit = frais.querySelector('.nomFrais').value;
      const qte = parseFloat(frais.querySelector('.qteFraisChantier').value) || 0;
      const unite = frais.querySelector('.uniteFraisChantier').value;
      const prixU = parseFloat(frais.querySelector('.prixUFraisChantier').value) || 0;
      const total = prixU * qte;

      return {
        DEVIS_ID: devisId,
        CODE_ID: codeId,
        LIBELLE: libelle,
        PRODUIT: nomProduit,
        QTE: qte,
        UNITE: unite,
        NB_H: 0,
        PRIX_U: prixU,
        TOTAL: total,
      };
    })
    .filter(frais => frais.CODE_ID && frais.PRODUIT && frais.QTE > 0 && frais.PRIX_U > 0);

  const payload = {
    devis_id: devisId,
    sections: sections,
    achats: achats,
    frais: frais,
  };

  if (!libelle.trim()) {
    alert('Veuillez remplir le libellé du devis.');
    return;
  }

  if (sections.length === 0 && achats.length === 0 && frais.length === 0) {
    alert('Veuillez ajouter au moins une section, un achat ou un frais chantier avant de valider.');
    return;
  }

  try {
    const response = await postData('http://localhost:3000/api/postes', payload);
    // Redirection vers la liste des postes du devis :

    if (Array.isArray(response.data?.resultats) && response.data.resultats.length > 0) {
      alert('Succes');
      console.log('données envoyées avec succès :', response.data.resultats);
      window.location.href = `../../pages/postesList.html?devis_id=${devisId}&ra_id=${ra_id}`;
    } else {
      alert('Aucune donnée reçue après l’envoi du post');
      return;
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du poste : ", error);
    alert('Erreur lors de l envoie du poste');
  }
}
