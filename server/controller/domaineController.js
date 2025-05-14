import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/domaineService.js';

const createDomaine = async (req, res) => {
  try {
    const result = await Service.createDomaine(req.body);
    sendSuccessResponse(res, 201, 'Domaine créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllDomaines = async (req, res) => {
  try {
    const result = await Service.getAllDomaines(req.body);
    sendSuccessResponse(res, 200, 'Domaines récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getDomaineById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getDomaineById(id);
    sendSuccessResponse(res, 200, `Domaine avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateDomaine = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateDomaine(id, req.body);
    sendSuccessResponse(res, 200, 'Domaine mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteDomaine = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteDomaine(id);
    sendSuccessResponse(res, 200, 'Domaine supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createDomaine,
  getAllDomaines,
  getDomaineById,
  updateDomaine,
  deleteDomaine,
};
