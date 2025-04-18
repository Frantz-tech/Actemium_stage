import Expertise from '../models/expertiseSchema.js';

const createExpertise = async expertData => {
  try {
    const expertise = new Expertise(expertData);
    await expertise.save();
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la création d'une expertise : ${error.message}`);
  }
};

const getExpertise = async () => {
  try {
    const expertise = await Expertise.find();
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des expertises : ${error.message}`);
  }
};

const getExpertiseId = async id => {
  try {
    const expertise = await Expertise.findById(id);
    if (!expertise) {
      throw new Error(`L'expertise avec l'id ${id} n'as pas été trouvée`);
    }
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'expertise : ${error.message}`);
  }
};

const updateExpertise = async (id, expertData) => {
  try {
    const expertise = await Expertise.findByIdAndUpdate(id, expertData, {
      new: true,
      runValidators: true,
    });
    if (!expertise) {
      throw new Error(`L'expertise avec l'id ${id} n'as pas été trouvée pour la mise à jour`);
    }
  } catch (error) {
    throw new Error(`Erreur lros de la mise à jour de l'expertise : ${error.message}`);
  }
};

const deleteExpertise = async id => {
  try {
    const expertise = await Expertise.findByIdAndDelete(id);
    if (!expertise) {
      throw new Error(`L'expertise avec l'id ${id} n'as pas été trouvée pour la suppression `);
    }
    return expertise;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de l'expertise : ${error.message}`);
  }
};

export const Repository = {
  createExpertise,
  getExpertise,
  getExpertiseId,
  updateExpertise,
  deleteExpertise,
};
