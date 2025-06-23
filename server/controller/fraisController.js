import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/fraisService.js';

const createFraisGlobaux = async (req, res, next) => {
  try {
    const result = await Service.createFrais(req.body);
    sendSuccessResponse(res, 201, 'Frais globaux créer avec succès', result);
  } catch (err) {
    next(err);
  }
};

const getAllFraisGlobaux = async (req, res, next) => {
  try {
    const result = await Service.getAllFraisGlobaux();
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const patchFraisGlobaux = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.updateFrais(id, req.body);
    sendSuccessResponse(res, 200, 'Frais globaux mis à jour avec succès', result);
  } catch (err) {
    next(err);
  }
};
const deleteFraisGlobaux = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteFrais(id);
    sendSuccessResponse(res, 200, 'Frais globaux supprimé avec succès', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  getAllFraisGlobaux,
  createFraisGlobaux,
  patchFraisGlobaux,
  deleteFraisGlobaux,
};
