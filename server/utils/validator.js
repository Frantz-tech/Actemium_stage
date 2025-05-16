export function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

export function validatePassword(password) {
  const regexPasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regexPasword.test(password);
}

export const rolesValides = ['admin', 'ca', 'ra'];

export const validateRole = role => {
  return rolesValides.includes(role);
};
