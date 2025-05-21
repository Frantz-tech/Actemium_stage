import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/devisService.js';

const createDevis = async (req, res) => {
  try {
    const result = await Service.createDevis(req.body);
    console.log('Résultat controller.createDevis :', result);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
    sendSuccessResponse(res, 201, 'Devis créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllDevis = async (req, res) => {
  try {
    const result = await Service.getAllDevis(req.body);
    sendSuccessResponse(res, 200, 'Devis récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getDevisById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getDevisById(id);
    sendSuccessResponse(res, 200, `Devis avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateDevis(id, req.body);
    sendSuccessResponse(res, 200, 'Devis mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteDevis(id);
    sendSuccessResponse(res, 200, 'Devis supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createDevis,
  getAllDevis,
  getDevisById,
  updateDevis,
  deleteDevis,
};
