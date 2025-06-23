import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/clientService.js';

const createClient = async (req, res, next) => {
  try {
    const result = await Service.createClient(req.body);
    sendSuccessResponse(res, 201, 'Client créer avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getAllClients = async (req, res, next) => {
  try {
    const result = await Service.getAllClients(req.body);
    sendSuccessResponse(res, 200, 'Clients récupérés avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.getClientById(id);
    sendSuccessResponse(res, 200, `Client avec ID ${id} récupéré avec succès`, result);
  } catch (err) {
    next(err);
  }
};
const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.updateClient(id, req.body);
    sendSuccessResponse(res, 200, 'Client mis à jour avec succès', result);
  } catch (err) {
    next(err);
  }
};
const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteClient(id);
    sendSuccessResponse(res, 200, 'Client supprimé avec succès', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
