import bcrypt from 'bcrypt';
import generatePassword from 'password-generator';
import { hashPassword } from '../middleware/passwordMiddleware.js';
import { Repository } from '../repository/userRepository.js';
import { validateEmail, validatePassword, validateRole } from '../utils/validator.js';
import { sendPasswordEmail } from './emailService.js';

const generateUniqueRaId = async (prenom, nom) => {
  const baseRaId = (prenom[0] + nom[0]).toUpperCase(); // e.g. "DC"

  if (!(await Repository.checkRaIdExists(baseRaId))) {
    return baseRaId; // Return base ID if it doesn't exist
  }

  let suffix = 1;
  let raId = baseRaId + suffix;
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
    const tempPassword = generatePassword(12, false, /[wd@#$%^&*]/);
    userData.PASSWORD = await hashPassword(tempPassword);
    userData.tempPassword = tempPassword;
    userData.MUST_CHANGE_PASSWORD = 1;

    if (userData.ROLE === 'Responsable d affaire' || userData.ROLE === 'Administrateur') {
      userData.RA_ID = await generateUniqueRaId(userData.PRENOM, userData.NOM);
    }

    if (errors.length > 0) {
      console.log('Erreurs dans userService :', errors);
      return { errors };
    }
    const newUser = await Repository.createUser(userData);
    await sendPasswordEmail(userData.EMAIL, userData.tempPassword);
    return newUser;
  } catch (error) {
    console.error('Erreur lors de la création de l utilisateur ... ', error);

    throw error;
  }
};

const authenticateUser = async (email, plainPassword) => {
  const user = await Repository.findUserByEmail(email);
  const errors = [];

  if (!user) {
    errors.push('User non trouvé avec cet email');
    return { errors };
  }
  if (user.ROLE !== 'Responsable d affaire' && user.ROLE !== 'Chargé d affaire') {
    errors.push('Accès refusé : rôle non autorisé');
  }
  const isPasswordValid = await bcrypt.compare(plainPassword, user.PASSWORD);
  if (!isPasswordValid) {
    errors.push('Mot de passe incorrect');
  }
  if (errors.length > 0) {
    return { errors };
  }
  return user;
};

const updateUserPassword = async (email, newPassword) => {
  try {
    const errors = [];
    if (!validatePassword(newPassword)) {
      errors.push(
        'Le mot de passe doit faire au moins 8 caractères, contenir au moins une lettre minuscule, une majuscule, un caractère spécial(!@#$%^&* etc) et un chiffre'
      );
    }

    if (errors.length > 0) {
      console.log('Erreurs dans userService :', errors);
      return { errors };
    }

    const hashedUserPassword = await hashPassword(newPassword);
    const result = await Repository.updateUserPassword(email, hashedUserPassword);

    return result;
  } catch (error) {
    console.error('Erreur dans updateUserPoassword service', error);
    throw error;
  }
};

const resetUserPassword = async (email, newPassword) => {
  try {
    const hashedPassword = await hashPassword(newPassword);
    const result = await Repository.resetUserPassword(email, hashedPassword);

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
  authenticateUser,
  updateUserPassword,
};
