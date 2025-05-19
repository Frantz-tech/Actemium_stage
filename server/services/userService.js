import { hashPassword } from '../middleware/passwordMiddleware.js';
import { Repository } from '../repository/userRepository.js';
import { validateEmail, validatePassword, validateRole } from '../utils/validator.js';

const generateUniqueRaId = async (prenom, nom) => {
  const baseRaId = (prenom[0] + nom[0]).toUpperCase();
  let raId = baseRaId;
  let suffix = 0;
  while (await Repository.checkRaIdExists(raId)) {
    suffix++;
    raId = baseRaId + suffix;
  }
  return raId;
};

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
      console.log('Erreurs dans userService :', errors);
      return { errors };
    }
    userData.RA_ID = await generateUniqueRaId(userData.PRENOM, userData.NOM);
    userData.MUST_CHANGE_PASSWORD = 1;
    userData.PASSWORD = await hashPassword(userData.PASSWORD);
    console.log(userData);

    const newUser = await Repository.createUser(userData);
    return newUser;
  } catch (error) {
    console.error('Erreur lors de la création de l utilisateur ... ', error);

    throw error;
  }
};

const resetUserPassword = async (email, newPassword) => {
  try {
    const hashedPassword = await hashPassword(newPassword);
    const result = await Repository.changeUserPassword(email, hashedPassword);

    return result;
  } catch (error) {
    console.error('Erreur dans changeUserPassword service: ', error);
    throw error;
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
  resetUserPassword,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
