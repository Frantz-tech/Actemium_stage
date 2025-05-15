// Repository pour les clients

import pool from '../config/db.js';

// Recuperer l'admin

const findUserByEmail = async email => {
  const [rows] = await pool.query('SELECT * FROM USER WHERE EMAIL = ?', [email]);
  return rows[0];
};

export const Repository = {
  findUserByEmail,
};
