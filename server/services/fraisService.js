import { Repository } from '../repository/fraisRepository.js';

const createFraisGlobaux = async fraisGlobauxData => {
  return await Repository.createFraisGlobaux(fraisGlobauxData);
};
const getAllFraisGlobaux = async () => {
  return await Repository.getAllFraisGlobaux();
};

const patchFraisGlobaux = async newData => {
  return await Repository.patchFraisGlobaux(newData);
};
const deleteFraisGlobaux = async fraisId => {
  return await Repository.deleteFraisGlobaux(fraisId);
};

export const Service = {
  createFraisGlobaux,
  getAllFraisGlobaux,
  patchFraisGlobaux,
  deleteFraisGlobaux,
};
