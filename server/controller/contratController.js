import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/contratService.js';

const createContrat = async (req, res) => {
  try {
    const result = await Service.createContrat(req.body);
    sendSuccessResponse(res, 201, 'Contrat créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllContrats = async (req, res) => {
  try {
    const result = await Service.getAllContrats(req.body);
    sendSuccessResponse(res, 200, 'Contrats récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getContratById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getContratById(id);
    sendSuccessResponse(res, 200, `Contrat avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateContrat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateContrat(id, req.body);
    sendSuccessResponse(res, 200, 'Contrat mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteContrat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteContrat(id);
    sendSuccessResponse(res, 200, 'Contrat supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createContrat,
  getAllContrats,
  getContratById,
  updateContrat,
  deleteContrat,
};
