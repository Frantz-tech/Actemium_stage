import { Repository } from '../../repository/segmentationRepository/achatRepository.js';

const getAllAchats = async context => {
  return await Repository.getAllAchats(context);
};

export const Service = {
  getAllAchats,
};
