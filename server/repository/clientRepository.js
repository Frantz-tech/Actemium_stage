// Repository pour les clients

import pool from '../config/db.js';

// Créer une nouvelle client :

const createClient = async clientData => {
  const { code, type } = clientData;
  const [result] = await pool.query('INSERT INTO CLIENT (CODE, TYPE) VALUES (?,?)', [code, type]);
  return result.insertId;
};

// Récuperer toutes les clients
const getAllClients = async () => {
  const [rows] = await pool.query('SELECT * FROM CLIENT');
  return rows;
};

// Récuperer une client par ID
const getClientById = async id => {
  const [rows] = await pool.query('SELECT * FROM CLIENT WHERE CLIENT_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour une client
const updateClient = async (id, clientData) => {
  const { code, type } = clientData;
  return await pool.query('UPDATE CLIENT SET CODE = ?, TYPE = ? WHERE CLIENT_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer une client
const deleteClient = async id => {
  return await pool.query('DELETE FROM CLIENT WHERE CLIENT_ID = ?', [id]);
};
export const Repository = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
