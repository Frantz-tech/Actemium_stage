// hashPassword.js
import bcrypt from 'bcrypt';

const plainPassword = '123456'; // 🔒 modifie ceci avec ton vrai mot de passe admin

const run = async () => {
  try {
    const hash = await bcrypt.hash(plainPassword, 10);
    console.log('Hash généré :', hash);
  } catch (error) {
    console.error('Erreur lors du hashage :', error);
  }
};

run();
