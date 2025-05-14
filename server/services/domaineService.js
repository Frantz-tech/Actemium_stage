import { Repository } from '../repository/domaineRepository.js';

const createDomaine = async domaineData => {
  return await Repository.createDomaine(domaineData);
};
const getAllDomaines = async () => {
  return await Repository.getAllDomaines();
};
const getDomaineById = async id => {
  return await Repository.getDomaineById(id);
};
const updateDomaine = async (id, domaineData) => {
  return await Repository.updateDomaine(id, domaineData);
};
const deleteDomaine = async id => {
  return await Repository.deleteDomaine(id);
};

export const Service = {
  createDomaine,
  getAllDomaines,
  getDomaineById,
  updateDomaine,
  deleteDomaine,
};
