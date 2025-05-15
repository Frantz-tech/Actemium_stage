// Repository pour les commanditaires

import pool from '../config/db.js';

// Créer une nouvelle commanditaire :

const createCommanditaire = async commanditaireData => {
  const { nom, email } = commanditaireData;
  const [result] = await pool.query('INSERT INTO COMMANDITAIRE (NOM, EMAIL) VALUES (?,?)', [
    nom,
    email,
  ]);
  return result.insertId;
};

// Récuperer toutes les commanditaires
const getAllCommanditaires = async () => {
  const [rows] = await pool.query('SELECT * FROM COMMANDITAIRE');
  return rows;
};

// Récuperer une commanditaire par ID
const getCommanditaireById = async id => {
  const [rows] = await pool.query('SELECT * FROM COMMANDITAIRE WHERE CMDT_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour une commanditaire
const updateCommanditaire = async (id, commanditaireData) => {
  const { nom, email } = commanditaireData;
  return await pool.query('UPDATE COMMANDITAIRE SET NOM = ?, EMAIL = ? WHERE CMDT_ID = ? ', [
    nom,
    email,
    id,
  ]);
};

// Supprimer une commanditaire
const deleteCommanditaire = async id => {
  return await pool.query('DELETE FROM COMMANDITAIRE WHERE CMDT_ID = ?', [id]);
};
export const Repository = {
  createCommanditaire,
  getAllCommanditaires,
  getCommanditaireById,
  updateCommanditaire,
  deleteCommanditaire,
};
