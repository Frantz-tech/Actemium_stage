import bcrypt from 'bcrypt';
import { Repository } from '../repository/adminRepository.js';

export const Service = {
  async authenticateAdmin(email, plainPassword) {
    const user = await Repository.findUserByEmail(email);
    if (!user) {
      throw new Error('User non trouvé avec cet email');
    }
    if (user.role !== 'admin') {
      throw new Error('Accès refusé : rôle non autorisé');
    }
    const isPasswordValid = await bcrypt.compare(plainPassword, user.PASSWORD);
    if (!isPasswordValid) {
      throw new Error('Mot de passe incorrect');
    }
    return user;
  },
};
