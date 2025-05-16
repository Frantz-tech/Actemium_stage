import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/userService.js';

const createUser = async (req, res) => {
  try {
    const result = await Service.createUser(req.body);
    sendSuccessResponse(res, 201, 'User créer avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await Service.getAllUsers(req.body);
    sendSuccessResponse(res, 200, 'Users récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getUserById(id);
    sendSuccessResponse(res, 200, `User avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateUser(id, req.body);
    sendSuccessResponse(res, 200, 'User mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteUser(id);
    sendSuccessResponse(res, 200, 'User supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllRole = async (req, res) => {
  try {
    const result = await Service.getAllRole();
    sendSuccessResponse(res, 200, 'Roles récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  getAllRole,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
