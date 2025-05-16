import { Repository } from '../repository/userRepository.js';
import { validateEmail, validatePassword, validateRole } from '../utils/validator.js';

const createUser = async userData => {
  try {
    const errors = [];
    if (!userData) {
      errors.push("Données requises pour la création d'un utilisateur");
    }
    if (!userData.NOM || userData.NOM.length < 3) {
      errors.push("Le nom de l'utilisateur doit faire au minimum 3 caractères pour être valide");
    }
    if (!userData.PRENOM || userData.PRENOM.length < 3) {
      errors.push("Le prénom de l'utilisateur doit faire au minimum 3 caractères pour être valide");
    }

    if (!userData.ROLE || !validateRole(userData.ROLE)) {
      errors.push(
        "Le rôle de l'utilisateur doit être 'Administrateur', 'Chargé d affaire' ou 'Responsable d affaire'"
      );
    }
    if (!validateEmail(userData.EMAIL)) {
      errors.push("L'email est invalide");
    }
    if (!validatePassword(userData.PASSWORD)) {
      errors.push(
        'Le mot de passe doit faire au moins 8 caractères, contenir au moins une lettre minuscule, une majuscule, un caractère spécial(!@#$%^&* etc) et un chiffre'
      );
    }
    if (errors.length > 0) {
      return { errors };
    }
    const newUser = await Repository.createUser(userData);
    return newUser;
  } catch (error) {
    throw new Error(`Erreur lors de la création du nouvel utilisateur${error.message}`);
  }
};
const getAllUsers = async () => {
  return await Repository.getAllUsers();
};
const getUserById = async id => {
  return await Repository.getUserById(id);
};
const updateUser = async (id, userData) => {
  return await Repository.updateUser(id, userData);
};
const deleteUser = async id => {
  return await Repository.deleteUser(id);
};

const getAllRole = async () => {
  return await Repository.getAllRole();
};

export const Service = {
  getAllRole,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
