import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/posteService.js';

const createPoste = async (req, res) => {
  try {
    const postes = req.body;
    console.log('Payload recu : ', postes);

    const result = await Service.createPoste(postes);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ message: result.errors });
    }
    sendSuccessResponse(res, 201, 'Poste créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPostes = async (req, res) => {
  try {
    const { devis_id, ra_id } = req.query;
    console.log('Params recu dans le controller', { devis_id, ra_id });

    const result = await Service.getAllPostes(devis_id, ra_id);
    sendSuccessResponse(res, 200, 'Liste des postes lié au devis récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createPoste,
  getAllPostes,
};
