import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/expertiseService.js';

const createExpertise = async (req, res, next) => {
  try {
    const result = await Service.createExpertise(req.body);
    sendSuccessResponse(res, 201, 'Expertise créer avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getAllExpertises = async (req, res, next) => {
  try {
    const result = await Service.getAllExpertises(req.body);
    sendSuccessResponse(res, 200, 'Expertises récupérés avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getExpertiseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.getExpertiseById(id);
    sendSuccessResponse(res, 200, `Expertise avec ID ${id} récupéré avec succès`, result);
  } catch (err) {
    next(err);
  }
};
const updateExpertise = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.updateExpertise(id, req.body);
    sendSuccessResponse(res, 200, 'Expertise mis à jour avec succès', result);
  } catch (err) {
    next(err);
  }
};
const deleteExpertise = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteExpertise(id);
    sendSuccessResponse(res, 200, 'Expertise supprimé avec succès', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  createExpertise,
  getAllExpertises,
  getExpertiseById,
  updateExpertise,
  deleteExpertise,
};
