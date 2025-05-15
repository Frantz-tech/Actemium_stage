import { Repository } from '../repository/expertiseRepository.js';

const createExpertise = async expertiseData => {
  return await Repository.createExpertise(expertiseData);
};
const getAllExpertises = async () => {
  return await Repository.getAllExpertises();
};
const getExpertiseById = async id => {
  return await Repository.getExpertiseById(id);
};
const updateExpertise = async (id, expertiseData) => {
  return await Repository.updateExpertise(id, expertiseData);
};
const deleteExpertise = async id => {
  return await Repository.deleteExpertise(id);
};

export const Service = {
  createExpertise,
  getAllExpertises,
  getExpertiseById,
  updateExpertise,
  deleteExpertise,
};
