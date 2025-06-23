import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/contratService.js';

const createContrat = async (req, res, next) => {
  try {
    const result = await Service.createContrat(req.body);
    sendSuccessResponse(res, 201, 'Contrat créer avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getAllContrats = async (req, res, next) => {
  try {
    const result = await Service.getAllContrats(req.body);
    sendSuccessResponse(res, 200, 'Contrats récupérés avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getContratById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.getContratById(id);
    sendSuccessResponse(res, 200, `Contrat avec ID ${id} récupéré avec succès`, result);
  } catch (err) {
    next(err);
  }
};
const updateContrat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.updateContrat(id, req.body);
    sendSuccessResponse(res, 200, 'Contrat mis à jour avec succès', result);
  } catch (err) {
    next(err);
  }
};
const deleteContrat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteContrat(id);
    sendSuccessResponse(res, 200, 'Contrat supprimé avec succès', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  createContrat,
  getAllContrats,
  getContratById,
  updateContrat,
  deleteContrat,
};
