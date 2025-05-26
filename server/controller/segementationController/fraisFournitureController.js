import { sendSuccessResponse } from '../../helper/responseHelper.js';
import { Service } from '../../services/segmentationService/fraisFournitureService.js';

const getAllFraisFournitures = async (req, res) => {
  try {
    const context = req.query.context;
    console.log('context recu : ', context);

    if (!context) {
      return res.status(400).json({ error: 'Le paramètre "context" est requis.' });
    }

    const result = await Service.getAllFraisFournitures(context);
    sendSuccessResponse(res, 200, 'FraisFournitures récupérées avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  getAllFraisFournitures,
};
