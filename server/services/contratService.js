import { Repository } from '../repository/contratRepository.js';

const createContrat = async contratData => {
  return await Repository.createContrat(contratData);
};
const getAllContrats = async () => {
  return await Repository.getAllContrats();
};
const getContratById = async id => {
  return await Repository.getContratById(id);
};
const updateContrat = async (id, contratData) => {
  return await Repository.updateContrat(id, contratData);
};
const deleteContrat = async id => {
  return await Repository.deleteContrat(id);
};

export const Service = {
  createContrat,
  getAllContrats,
  getContratById,
  updateContrat,
  deleteContrat,
};
