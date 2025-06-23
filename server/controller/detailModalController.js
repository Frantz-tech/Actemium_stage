import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/detailModalService.js';

const getDetailPostes = async (req, res, next) => {
  try {
    const { devis_id, ra_id } = req.query;
    console.log('Params recu dans le controller', { devis_id, ra_id });

    const result = await Service.getDetailPostes(devis_id, ra_id);
    sendSuccessResponse(res, 200, 'Détail du poste récupéré avec succès :', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  getDetailPostes,
};
