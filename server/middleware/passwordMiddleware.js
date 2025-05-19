import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async plainPassword => {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
