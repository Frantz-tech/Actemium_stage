import Contrat from '../models/contratSchema.js';

const createContrat = async contratData => {
  try {
    const newContrat = new Contrat(contratData);
    await newContrat.save();

    return newContrat;
  } catch (error) {
    throw new Error(`Erreur lors de la création du contrat : ${error.message}`);
  }
};

const getContrat = async () => {
  try {
    const contrats = await Contrat.find();

    return contrats;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des contrats :${error.message}`);
  }
};

const getContratId = async id => {
  try {
    const contrat = await Contrat.findById(id);

    if (!contrat) {
      throw new Error(`Erreur, contrat avec l'id ${id} non trouvé`);
    }

    return contrat;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du contrat: ${error.message}`);
  }
};

const updateContrat = async (id, contratData) => {
  try {
    const updateContrat = await Contrat.findByIdAndUpdate(id, contratData, {
      new: true,
      runValidators: true,
    });

    if (!updateContrat) {
      throw new Error(`Erreur, contrat avec l'id ${id} non trouvé pour la modification`);
    }

    return updateContrat;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du contrat : ${error.message}`);
  }
};

const deleteContrat = async id => {
  try {
    const deleteContrat = await Contrat.findByIdAndDelete(id);

    if (!deleteContrat) {
      throw new Error(`Erreur, contrat avec l'id ${id} non trouvé pour la suppression`);
    }
    return deleteContrat;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du contrat : ${error.message}`);
  }
};

export const Repository = {
  createContrat,
  getContrat,
  getContratId,
  updateContrat,
  deleteContrat,
};
