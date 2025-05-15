import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/expertiseService.js';

const createExpertise = async (req, res) => {
  try {
    const result = await Service.createExpertise(req.body);
    sendSuccessResponse(res, 201, 'Expertise créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllExpertises = async (req, res) => {
  try {
    const result = await Service.getAllExpertises(req.body);
    sendSuccessResponse(res, 200, 'Expertises récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getExpertiseById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getExpertiseById(id);
    sendSuccessResponse(res, 200, `Expertise avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateExpertise(id, req.body);
    sendSuccessResponse(res, 200, 'Expertise mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteExpertise(id);
    sendSuccessResponse(res, 200, 'Expertise supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createExpertise,
  getAllExpertises,
  getExpertiseById,
  updateExpertise,
  deleteExpertise,
};
