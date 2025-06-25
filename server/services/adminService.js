import bcrypt from 'bcrypt';
import { Repository } from '../repository/adminRepository.js';

const authenticateAdmin = async (email, plainPassword) => {
  const user = await Repository.findUserByEmail(email);
  const isPasswordValid = await bcrypt.compare(plainPassword, user.PASSWORD);
  const errors = [];

  if (!user) {
    errors.push('Admin non trouvé avec cet email');
  }
  if (!isPasswordValid) {
    errors.push('Mot de passe incorrect');
  }
  if (user.ROLE !== 'Administrateur') {
    errors.push('Accès refusé : rôle non autorisé');
  }

  if (errors.length > 0) {
    return { errors };
  }
  return user;
};
export const Service = {
  authenticateAdmin,
};
