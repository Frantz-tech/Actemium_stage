import { sendSuccessResponse } from '../../helper/responseHelper.js';
import { Service } from '../../services/segmentationService/sectionService.js';

const getAllSections = async (req, res) => {
  try {
    const context = req.query.context;
    console.log('context recu : ', context);

    if (!context) {
      return res.status(400).json({ error: 'Le paramètre "context" est requis.' });
    }

    const result = await Service.getAllSections(context);
    sendSuccessResponse(res, 200, 'Sections récupérées avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  getAllSections,
};
