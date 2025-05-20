// Repository pour les users

import pool from '../config/db.js';

// Créer un nouveau user :

const createUser = async userData => {
  const { NOM, PRENOM, EMAIL, PASSWORD, MUST_CHANGE_PASSWORD, ROLE } = userData;
  const [result] = await pool.query(
    'INSERT INTO `USER` (NOM,PRENOM,EMAIL,PASSWORD,MUST_CHANGE_PASSWORD,ROLE) VALUES (?,?,?,?,?,?)',
    [NOM, PRENOM, EMAIL, PASSWORD, MUST_CHANGE_PASSWORD, ROLE]
  );
  return result.insertId;
};

// Modifier le mot de passe

const resetUserPassword = async (email, newPassword) => {
  const [result] = await pool.query(
    'UPDATE `USER` SET PASSWORD = ?, MUST_CHANGE_PASSWORD = 1 WHERE EMAIL = ?',
    [newPassword, email]
  );
  return result;
};

// Récuperer tous les users
const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM `USER`');
  return rows;
};

// Récuperer un user par ID
const getUserById = async id => {
  const [rows] = await pool.query('SELECT * FROM `USER` WHERE USER_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour un user
const updateUser = async (id, userData) => {
  const { code, type } = userData;
  return await pool.query('UPDATE `USER` SET CODE = ?, TYPE = ? WHERE USER_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer un user
const deleteUser = async id => {
  return await pool.query('DELETE FROM `USER` WHERE USER_ID = ?', [id]);
};

// Récuperer un all rôle
const getAllRole = async () => {
  const [rows] = await pool.query(`SHOW COLUMNS FROM USER WHERE Field = 'ROLE'`);
  const enumStr = rows[0].Type;
  const roles = enumStr.replace('enum(', '').replace(')', '').replace(/'/g, '').split(',');
  return roles;
};

export const Repository = {
  createUser,
  resetUserPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllRole,
};
