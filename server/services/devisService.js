import { Repository } from '../repository/devisRepository.js';

const createDevis = async devisData => {
  try {
    const errors = [];
    if (!devisData) {
      errors.push("Données requises pour la création d'un devis");
    }
    if (!devisData.LIBELLE || devisData.LIBELLE.trim().length < 3) {
      errors.push('Le libellé du devis doit faire au moins 3 charactères');
    }
    if (!devisData.RA_ID) {
      errors.push('RA_ID est requis');
    }
    const invalidValues = [
      '',
      'CLIENT',
      'DOMAINE',
      'EXPERTISE',
      'CONTRAT',
      'commanditaire',
      'add_new',
    ];
    if (
      !devisData.CMDT_TYPE ||
      invalidValues.includes(devisData.CMDT_TYPE) ||
      !devisData.CLIENT_TYPE ||
      invalidValues.includes(devisData.CLIENT_TYPE) ||
      !devisData.EXPERTISE_TYPE ||
      invalidValues.includes(devisData.EXPERTISE_TYPE) ||
      !devisData.DOMAINE_TYPE ||
      invalidValues.includes(devisData.DOMAINE_TYPE) ||
      !devisData.CONTRAT_TYPE ||
      invalidValues.includes(devisData.CONTRAT_TYPE)
    ) {
      errors.push('La segmentation doit être complète pour pouvoir créer le devis');
    }
    if (errors.length > 0) {
      return { errors };
    }

    const newDevis = await Repository.createDevis(devisData);
    console.log('✅ Nouveau devis créé avec ID : ', newDevis);
    return newDevis;
  } catch (error) {
    console.error('Erreur lors de la création du devis', error);
    return { errors: ['Erreur lors de la création du devis'] };
  }
};
const getAllDevis = async () => {
  return await Repository.getAllDevis();
};
const getDevisById = async id => {
  return await Repository.getDevisById(id);
};
const updateDevis = async (id, devisData) => {
  return await Repository.updateDevis(id, devisData);
};
const deleteDevis = async id => {
  return await Repository.deleteDevis(id);
};

export const Service = {
  createDevis,
  getAllDevis,
  getDevisById,
  updateDevis,
  deleteDevis,
};
