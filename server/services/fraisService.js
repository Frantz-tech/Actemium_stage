import { Repository } from '../repository/fraisRepository.js';

// const createFrais = async fraisData => {
//   return await Repository.createFrais(fraisData);
// };
const getAllFrais = async () => {
  return await Repository.getAllFrais();
};
// const getFraisById = async id => {
//   return await Repository.getFraisById(id);
// };
// const updateFrais = async (id, fraisData) => {
//   return await Repository.updateFrais(id, fraisData);
// };
// const deleteFrais = async id => {
//   return await Repository.deleteFrais(id);
// };

export const Service = {
  // createFrais,
  getAllFrais,
  // getFraisById,
  // updateFrais,
  // deleteFrais,
};
