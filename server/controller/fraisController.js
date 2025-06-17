import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/fraisService.js';

const createFraisGlobaux = async (req, res) => {
  try {
    const result = await Service.createFrais(req.body);
    sendSuccessResponse(res, 201, 'Frais globaux créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllFraisGlobaux = async (req, res) => {
  try {
    const result = await Service.getAllFraisGlobaux();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Erreur dans getAllFraisGlobaux:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const patchFraisGlobaux = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateFrais(id, req.body);
    sendSuccessResponse(res, 200, 'Frais globaux mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteFraisGlobaux = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteFrais(id);
    sendSuccessResponse(res, 200, 'Frais globaux supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  getAllFraisGlobaux,
  createFraisGlobaux,
  patchFraisGlobaux,
  deleteFraisGlobaux,
};
