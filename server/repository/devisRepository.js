// Repository pour les devis

import pool from '../config/db.js';

// Créer un nouveau devis avec génération automatique de DEVIS_REF (version simple)
const createDevis = async devisData => {
  const { LIBELLE, RA_ID, CMDT_ID, CLIENT_ID, EXP_ID, DOM_ID, CONTRAT_ID } = devisData;

  // Récupération du nom du commanditaire
  const [cmdtRows] = await pool.query('SELECT NOM FROM COMMANDITAIRE WHERE CMDT_ID = ?', [CMDT_ID]);
  const cmdtName = cmdtRows.length > 0 ? cmdtRows[0].NOM : 'XXX';

  // Extraction des 3 premières lettres du commanditaire en majuscule
  const cmdtCode = `${cmdtName.substring(0, 5).toUpperCase()}`;

  // Génération du devisRef simple avec numéro 01 fixe
  const devisRef = `${RA_ID}-${cmdtCode}-01`;

  // Insertion du devis
  const [result] = await pool.query(
    'INSERT INTO DEVIS (DEVIS_REF, LIBELLE, RA_ID, CMDT_ID, CLIENT_ID, EXP_ID, DOM_ID, CONTRAT_ID) VALUES (?,?,?,?,?,?,?,?)',
    [devisRef, LIBELLE, RA_ID, CMDT_ID, CLIENT_ID, EXP_ID, DOM_ID, CONTRAT_ID]
  );

  return result.insertId;
};

// Récuperer tous les devis
const getAllDevis = async () => {
  const [rows] = await pool.query(
    'SELECT d.DEVIS_REF,d.LIBELLE,d.RA_ID, d.ETAT, d.DATE_CREATION, c.NOM AS NOM, cl.TYPE AS NOM_CLIENT, dom.TYPE AS NOM_DOMAINE, e.TYPE AS NOM_EXPERTISE, ctr.TYPE AS NOM_CONTRAT FROM DEVIS d LEFT JOIN COMMANDITAIRE c on d.CMDT_ID = c.CMDT_ID LEFT JOIN CLIENT cl ON d.CLIENT_ID = cl.CLIENT_ID LEFT JOIN DOMAINE dom ON d.DOM_ID = dom.DOMAINE_ID LEFT JOIN EXPERTISE e ON d.EXP_ID = e.EXP_ID LEFT JOIN CONTRAT ctr ON d.CONTRAT_ID = ctr.CONTRAT_ID ORDER BY d.DEVIS_REF ASC'
  );
  return rows;
};

// Récuperer un devis par son ID
const getDevisById = async id => {
  const [rows] = await pool.query('SELECT * FROM DEVIS WHERE DEVIS_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour un devis
const updateDevis = async (id, devisData) => {
  const { code, type } = devisData;
  return await pool.query('UPDATE DEVIS SET CODE = ?, TYPE = ? WHERE DEVIS_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer un devis
const deleteDevis = async id => {
  return await pool.query('DELETE FROM DEVIS WHERE DEVIS_ID = ?', [id]);
};

const getDevisByRaId = async id => {
  const [rows] = await pool.query(
    'SELECT d.DEVIS_ID, d.DEVIS_REF,d.LIBELLE,d.RA_ID, d.ETAT, c.NOM AS NOM, cl.TYPE AS NOM_CLIENT, dom.TYPE AS NOM_DOMAINE, e.TYPE AS NOM_EXPERTISE, ctr.TYPE AS NOM_CONTRAT FROM DEVIS d LEFT JOIN COMMANDITAIRE c on d.CMDT_ID = c.CMDT_ID LEFT JOIN CLIENT cl ON d.CLIENT_ID = cl.CLIENT_ID LEFT JOIN DOMAINE dom ON d.DOM_ID = dom.DOMAINE_ID LEFT JOIN EXPERTISE e ON d.EXP_ID = e.EXP_ID LEFT JOIN CONTRAT ctr ON d.CONTRAT_ID = ctr.CONTRAT_ID WHERE  d.RA_ID = ? ORDER BY d.DEVIS_REF ASC',
    [id]
  );
  return rows;
};
export const Repository = {
  createDevis,
  getAllDevis,
  getDevisById,
  updateDevis,
  deleteDevis,
  getDevisByRaId,
};
