import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/fraisService.js';

const createFrais = async (req, res) => {
  try {
    const result = await Service.createFrais(req.body);
    sendSuccessResponse(res, 201, 'Frais créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllFrais = async (req, res) => {
  try {
    const result = await Service.getAllFrais(req.body);
    sendSuccessResponse(res, 200, 'Frais récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getFraisById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getFraisById(id);
    sendSuccessResponse(res, 200, `Frais avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateFrais = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateFrais(id, req.body);
    sendSuccessResponse(res, 200, 'Frais mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteFrais = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteFrais(id);
    sendSuccessResponse(res, 200, 'Frais supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createFrais,
  getAllFrais,
  getFraisById,
  updateFrais,
  deleteFrais,
};
