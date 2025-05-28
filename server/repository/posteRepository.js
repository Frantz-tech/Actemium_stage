// Recuperer l'admin
import pool from '../config/db.js';

const createPoste = async poste => {
  const sql = `INSERT INTO POSTES (DEVIS_ID, CODE_ID, LIBELLE, PRODUIT, QTE, UNITE, NB_H, PRIX_U,TOTAL) VALUES (?,?,?,?,?,?,?,?,?)`;

  const values = [
    poste.DEVIS_ID,
    poste.CODE_ID,
    poste.LIBELLE,
    poste.PRODUIT,
    poste.QTE,
    poste.UNITE,
    poste.NB_H,
    poste.PRIX_U,
    poste.TOTAL,
  ];
  const [result] = await pool.query(sql, values);
  return result.insertId;
};

// Recup les poste par id de devis
const getAllPostes = async (devis_id, ra_id) => {
  const [rows] = await pool.query(
    `SELECT p.DEVIS_ID, p.LIBELLE AS POSTE_LIBELLE,c.LIBELLE AS CODE_LIBELLE, p.PRODUIT, p.QTE, p.UNITE, p.NB_H, p.PRIX_U, p.TOTAL FROM POSTES p JOIN CODE c ON p.CODE_ID = c.CODE_ID WHERE p.DEVIS_ID = ? ORDER BY p.LIBELLE ASC`,
    [devis_id, ra_id]
  );
  return rows;
};

export const Repository = {
  createPoste,
  getAllPostes,
};
