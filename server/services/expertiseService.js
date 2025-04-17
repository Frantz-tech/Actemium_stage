import { Repository } from '../repository/expertiserRepository.js';

const createExpertise = async expertData => {
  try {
    const errors = [];
    if (!expertData) {
      errors.push('Données requise pour la création de l expertise ');
    }
    if (!expertData.code || expertData.code.length < 1) {
      errors.push(
        'Le code de l expertise doit faire au minimum 1 caractère et doit être en majuscule'
      );
    }
    if (!expertData.type || expertData.type.length < 3) {
      errors.push('Le type de l expertise doit faire au minimum 3 caratères');
    }
    if (errors.length > 0) {
      return { errors };
    }
    const expertise = await Repository.createExpertise(expertData);
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'expertise : ${error.message}`);
  }
};

const getExpertise = async () => {
  try {
    const errors = [];
    const expertise = await Repository.getExpertise();

    if (!expertise) {
      errors.push('Aucune expertise trouvée');
    }
    if (errors.length > 0) {
      return { errors };
    }
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des expertises :${error.message}`);
  }
};

const getExpertiseId = async id => {
  try {
    const errors = [];
    if (!id) {
      errors.push('ID manquant pour la récupération de l expertise');
    }
    if (errors.length > 0) {
      return { errors };
    }
    const expertise = await Repository.getExpertiseId(id);
    if (!id) {
      throw new Error(`L'expertise avec l'id ${id} non trouvé`);
    }
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'expertise : ${error.message}`);
  }
};
export const Services = {
  createExpertise,
  getExpertise,
  getExpertiseId,
};
