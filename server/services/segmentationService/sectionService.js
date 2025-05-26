import { Repository } from '../../repository/segmentationRepository/sectionRepository.js';

const getAllSections = async context => {
  return await Repository.getAllSections(context);
};

export const Service = {
  getAllSections,
};
