import { Repository } from '../repository/commanditaireRepository.js';

const createCommanditaire = async commanditaireData => {
  return await Repository.createCommanditaire(commanditaireData);
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
