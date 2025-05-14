// Repository pour les domaines

import pool from '../config/db.js';

// Créer une nouvelle domaine :

const createDomaine = async domaineData => {
  const { code, type } = domaineData;
  const [result] = await pool.query('INSERT INTO DOMAINE (CODE, TYPE) VALUES (?,?)', [code, type]);
  return result.insertId;
};

// Récuperer toutes les domaines
const getAllDomaines = async () => {
  const [rows] = await pool.query('SELECT * FROM DOMAINE');
  return rows;
};

// Récuperer une domaine par ID
const getDomaineById = async id => {
  const [rows] = await pool.query('SELECT * FROM DOMAINE WHERE DOMAINE_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour une domaine
const updateDomaine = async (id, domaineData) => {
  const { code, type } = domaineData;
  return await pool.query('UPDATE DOMAINE SET CODE = ?, TYPE = ? WHERE DOMAINE_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer une domaine
const deleteDomaine = async id => {
  return await pool.query('DELETE FROM DOMAINE WHERE DOMAINE_ID = ?', [id]);
};
export const Repository = {
  createDomaine,
  getAllDomaines,
  getDomaineById,
  updateDomaine,
  deleteDomaine,
};
