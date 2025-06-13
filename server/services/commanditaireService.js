import { Repository } from '../repository/commanditaireRepository.js';
import { validateEmail } from '../utils/validator.js';

const createCommanditaire = async (commanditaireData, logo) => {
  try {
    const errors = [];
    if (!commanditaireData) {
      errors.push('Données requises pour la création du commanditaire');
    }
    if (!commanditaireData.NOM || commanditaireData.NOM.trim().length < 3) {
      errors.push('Le nom du commanditaire doit faire au minimum 3 charactères');
    }
    if (!validateEmail(commanditaireData.EMAIL)) {
      errors.push("L'email est invalide");
    }
    if (errors.length > 0) {
      return { errors };
    }

    if (logo) {
      commanditaireData.LOGO = logo.filename;
    }
    const newCmdt = await Repository.createCommanditaire(commanditaireData);
    return newCmdt;
  } catch (error) {
    console.error('Erreur lors de la création du commanditaire', error);
    return { errors: ['Erreurs lors de la création du commanditaire'] };
  }
};
const getAllCommanditaires = async () => {
  return await Repository.getAllCommanditaires();
};
const getCommanditaireById = async id => {
  return await Repository.getCommanditaireById(id);
};
const updateCommanditaire = async (id, commanditaireData) => {
  return await Repository.updateCommanditaire(id, commanditaireData);
};
const deleteCommanditaire = async id => {
  return await Repository.deleteCommanditaire(id);
};

export const Service = {
  createCommanditaire,
  getAllCommanditaires,
  getCommanditaireById,
  updateCommanditaire,
  deleteCommanditaire,
};
