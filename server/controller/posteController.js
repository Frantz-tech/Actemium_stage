import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/posteService.js';

const createPoste = async (req, res) => {
  try {
    const postes = req.body;
    console.log('Payload recu : ', postes);

    const { resultats, errors } = await Service.createPoste(postes);

    if (resultats.length === 0 && errors.length > 0) {
      return res.status(400).json({ errors });
    }
    sendSuccessResponse(res, 201, 'Poste créer avec succès', { resultats, errors });
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

const deletePoste = async (req, res) => {
  try {
    const { devis_id, libelle } = req.query;
    console.log('req.query : ', req.query);

    if (!devis_id || !libelle) {
      return res
        .status(400)
        .json({ error: 'Le deivs et le libelle sont requis pour la suppression' });
    }
    const result = await Service.deletePoste(devis_id, libelle);
    sendSuccessResponse(res, 200, 'Poste supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createPoste,
  getAllPostes,
  deletePoste,
};
