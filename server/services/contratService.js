import { Repository } from '../repository/contratRepository.js';

const createContrat = async contratData => {
  try {
    const errors = [];
    if (!contratData) {
      errors.push('Données requises pour la création du contrat');
    }
    if (!contratData.code || contratData.code.length < 1) {
      errors.push('Le code doit faire au minimum 1 caractère');
    }
    if (contratData.code[0] !== contratData.code[0].toUpperCase()) {
      errors.push('Le code doit commencer par une majuscule');
    }
    if (errors.length > 0) {
      return { errors };
    }
    const newContrat = await Repository.createContrat(contratData);

    return { status: 'success ', data: newContrat };
  } catch (error) {
    throw new Error(`Erreur lors de la création du contrat : ${error.message}`);
  }
};
const getContrat = async () => {
  try {
    const errors = [];
    const contrats = await Repository.createContrat();
    if (!contrats) {
      errors.push('Aucun contrat trouvé');
    }
    if (errors.length > 0) {
      return { errors };
    }

    return { status: 'succes', data: contrats };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des contrats :${error.message}`);
  }
};

export const Service = {
  createContrat,
  getContrat,
};
