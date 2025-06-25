import bcrypt from 'bcrypt';
import { Repository } from '../repository/adminRepository.js';

const authenticateAdmin = async (email, plainPassword) => {
  const user = await Repository.findUserByEmail(email);
  console.log('DOnnées a avoir : ', user);

  const errors = [];

  if (!user) {
    console.log('User non trouvé avec cet email');

    errors.push('Admin non trouvé avec cet email');
    return { errors };
  }
  const isPasswordValid = await bcrypt.compare(plainPassword, user.PASSWORD);
  if (!isPasswordValid) {
    console.log('Pass incorrect');

    errors.push('Mot de passe incorrect');
    return { errors };
  }
  if (user.ROLE !== 'Administrateur') {
    console.log('Role non autorisé');

    errors.push('Accès refusé : rôle non autorisé');
    return { errors };
  }

  return user;
};
export const Service = {
  authenticateAdmin,
};
