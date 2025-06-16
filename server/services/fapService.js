import { Repository } from '../repository/fapRepository.js';

const createFap = async fapData => {
  const errors = [];
  const existingFap = await Repository.getFapByDevisId(fapData.DEVIS_ID);
  if (existingFap) {
    throw new Error(
      'Il existe déja une fap pour ce devis, il est pas possible d avoir plusieurs fap pour le meme devis, cependant vous pouvez la modifier si nécessaire'
    );
  }
  if (!fapData) {
    errors.push('Données requises pour la création de la fap');
  }

  if (!fapData.MARGE_VOULUE) {
    errors.push('La marge doit être obligatoirement rempli pour envoyer la fap');
  }

  if (!fapData.PRIX_VENTE_RETENUE) {
    errors.push('Le prix de vente doit être obligatoirement rempli pour envoyer la fap');
  }
  if (errors.length > 0) {
    return { errors };
  }
  console.log('SERVICE - Données envoyées au repository :', fapData);
  const newFap = await Repository.createFap(fapData);
  console.log('✅ Nouvelle fap créé avec ID : ', newFap);

  return newFap;
};

const getFapById = async devis_id => {
  const result = await Repository.getFapById(devis_id);

  return result;
};

export const Service = {
  createFap,
  getFapById,
};
