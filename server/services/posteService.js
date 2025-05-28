import { Repository } from '../repository/posteRepository.js';

const createPoste = async postesData => {
  const { sections = [], achats = [], frais = [] } = postesData;
  const postes = [...sections, ...achats, ...frais];
  const resultats = [];

  for (const poste of postes) {
    if (
      poste.DEVIS_ID &&
      poste.CODE_ID &&
      !['Code Section', 'Code Achat', 'Code Frais Chantier', '', undefined, null].includes(
        poste.CODE_ID
      )
    ) {
      const newPost = await Repository.createPoste(poste);
      resultats.push(newPost);
    }
  }

  return resultats;
};

const getAllPostes = async (devis_id, ra_id) => {
  return await Repository.getAllPostes(devis_id, ra_id);
};

export const Service = {
  createPoste,
  getAllPostes,
};
