// Repository pour les users

import pool from '../config/db.js';

// Créer un nouveau user :

const createUser = async userData => {
  const { NOM, PRENOM, EMAIL, PASSWORD, RA_ID, ROLE } = userData;
  const [result] = await pool.query(
    'INSERT INTO `USER` (NOM, PRENOM, EMAIL, PASSWORD, RA_ID, ROLE) VALUES (?,?,?,?,?,?)',
    [NOM, PRENOM, EMAIL, PASSWORD, RA_ID, ROLE]
  );
  return result.insertId;
};

// Récuperer tous les users
const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM USER');
  return rows;
};

// Récuperer un user par ID
const getUserById = async id => {
  const [rows] = await pool.query('SELECT * FROM USER WHERE USER_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour un user
const updateUser = async (id, userData) => {
  const { code, type } = userData;
  return await pool.query('UPDATE USER SET CODE = ?, TYPE = ? WHERE USER_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer un user
const deleteUser = async id => {
  return await pool.query('DELETE FROM USER WHERE USER_ID = ?', [id]);
};

// Récuperer un all rôle
const getAllRole = async () => {
  const [rows] = await pool.query(`SHOW COLUMNS FROM USER WHERE Field = 'ROLE'`);
  const enumStr = rows[0].Type;
  const roles = enumStr.replace('enum(', '').replace(')', '').replace(/'/g, '').split(',');
  return roles;
};

// Verifier si le RA_ID existe
const checkRaIdExists = async raId => {
  const [rows] = await pool.query('SELECT 1 FROM `USER` WHERE RA_ID = ? LIMIT 1', [raId]);
  return rows.length > 0;
};

export const Repository = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllRole,
  checkRaIdExists,
};
