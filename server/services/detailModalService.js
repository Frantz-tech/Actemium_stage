import { Repository } from '../repository/detailModalRepository.js';

const getDetailPostes = async (devis_id, ra_id) => {
  return await Repository.getDetailPostes(devis_id, ra_id);
};

export const Service = {
  getDetailPostes,
};
