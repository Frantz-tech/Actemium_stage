import { Repository } from '../../repository/segmentationRepository/fraisFournitureRepository.js';

const getAllFraisFournitures = async context => {
  return await Repository.getAllFraisFournitures(context);
};

export const Service = {
  getAllFraisFournitures,
};
