import { Repository } from '../repository/posteRepository.js';

const createPoste = async postesData => {
  const { sections = [], achats = [], frais = [] } = postesData;
  const postes = [...sections, ...achats, ...frais];
  const resultats = [];
  const errors = [];

  for (const poste of postes) {
    if (
      poste.DEVIS_ID &&
      poste.CODE_ID &&
      poste.LIBELLE &&
      !['Code Section', 'Code Achat', 'Code Frais Chantier', '', undefined, null].includes(
        poste.CODE_ID
      )
    ) {
      try {
        const newPost = await Repository.createPoste(poste);
        resultats.push(newPost);
      } catch (err) {
        errors.push({ poste, error: err.message });
      }
    } else {
      errors.push({ poste, error: 'Champ(s) requis manquant(s) ou code invalide' });
    }
  }

  return { resultats, errors };
};

const getAllPostes = async (devis_id, ra_id) => {
  return await Repository.getAllPostes(devis_id, ra_id);
};

const deletePoste = async (devis_id, libelle) => {
  try {
    if (!devis_id || !libelle) {
      throw Error(`Erreur, devis_id non trouvé pour la suppression`);
    }
    const deleted = await Repository.deletePoste(devis_id, libelle);
    return deleted;
  } catch (error) {
    console.error(`Erreur lors de la suppression du devis `, error.message);
    throw Error('Erreur lors de la suppression du poste, devis_id non trouvé');
  }
};

export const Service = {
  createPoste,
  getAllPostes,
  deletePoste,
};
