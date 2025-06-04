import jwt from 'jsonwebtoken';
import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/userService.js';

const createUser = async (req, res) => {
  try {
    const result = await Service.createUser(req.body);
    console.log('Résultat service.createUser :', result);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Service.authenticateUser(email, password);
    if (!user || user === null || user === undefined) {
      throw new Error('Utilisateur non trouvé');
    }

    // eslint-disable-next-line no-unused-vars
    const { PASSWORD: _PASSWORD, ...userSansPassword } = user;
    const token = jwt.sign(
      {
        id: user.USER_ID,
        email: user.EMAIL,
        role: user.ROLE,
        RA_ID: user.RA_ID,
      },

      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    sendSuccessResponse(res, 200, 'Connexion Réussie', {
      user: userSansPassword,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await Service.updateUserPassword(email, newPassword);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
    sendSuccessResponse(res, 200, 'Mot de passe mit à jour avec succès', result);
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
  loginUser,
  updateUserPassword,
};
