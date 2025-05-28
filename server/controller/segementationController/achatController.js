import { sendSuccessResponse } from '../../helper/responseHelper.js';
import { Service } from '../../services/segmentationService/achatService.js';

const getAllAchats = async (req, res) => {
  console.log('Appel route getAllAchats avec context:', req.query.context);
  try {
    const context = req.query.context;
    console.log('context recu : ', context);

    if (!context) {
      return res.status(400).json({ error: 'Le paramètre "context" est requis.' });
    }

    const result = await Service.getAllAchats(context);
    sendSuccessResponse(res, 200, 'Achats récupérées avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  getAllAchats,
};
