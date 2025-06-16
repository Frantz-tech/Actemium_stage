import pool from '../config/db.js';

const createFap = async fapData => {
  const {
    DEVIS_ID,
    TOTAL_MDVR,
    TOTAL_ACHAT,
    TOTAL_FRAIS_ACHAT_FOURNITURE,
    TOTAL_FRAIS_ACHAT_SOUSTRAITANCE_ETUDE,
    TOTAL_FRAIS_ACHAT,
    TOTAL_FRAIS_CHANTIER,
    PRIX_REVIENT_INTER,
    FRAIS_DEVIS_SANS_SUITE,
    FRAIS_FINANCIERS,
    FRAIS_DE_GROUPE,
    PRIX_REVIENT,
    MARGE_VOULUE,
    PRIX_VENTE_ESTIME,
    GARANTIE_ENSEMBLIER,
    PRIX_VENTE_RETENUE,
    MARGE,
  } = fapData;

  const [result] = await pool.query(
    'INSERT INTO FAP (DEVIS_ID, TOTAL_MDVR, TOTAL_ACHAT, TOTAL_FRAIS_ACHAT_FOURNITURE, TOTAL_FRAIS_ACHAT_SOUSTRAITANCE_ETUDE, TOTAL_FRAIS_ACHAT, TOTAL_FRAIS_CHANTIER, PRIX_REVIENT_INTER, FRAIS_DEVIS_SANS_SUITE, FRAIS_FINANCIERS, FRAIS_DE_GROUPE, PRIX_REVIENT, MARGE_VOULUE, PRIX_VENTE_ESTIME, GARANTIE_ENSEMBLIER, PRIX_VENTE_RETENUE, MARGE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      DEVIS_ID,
      TOTAL_MDVR,
      TOTAL_ACHAT,
      TOTAL_FRAIS_ACHAT_FOURNITURE,
      TOTAL_FRAIS_ACHAT_SOUSTRAITANCE_ETUDE,
      TOTAL_FRAIS_ACHAT,
      TOTAL_FRAIS_CHANTIER,
      PRIX_REVIENT_INTER,
      FRAIS_DEVIS_SANS_SUITE,
      FRAIS_FINANCIERS,
      FRAIS_DE_GROUPE,
      PRIX_REVIENT,
      MARGE_VOULUE,
      PRIX_VENTE_ESTIME,
      GARANTIE_ENSEMBLIER,
      PRIX_VENTE_RETENUE,
      MARGE,
    ]
  );
  console.log('Insertion dans la BDD avec données :', [
    DEVIS_ID,
    TOTAL_MDVR,
    TOTAL_ACHAT,
    TOTAL_FRAIS_ACHAT_FOURNITURE,
    TOTAL_FRAIS_ACHAT_SOUSTRAITANCE_ETUDE,
    TOTAL_FRAIS_ACHAT,
    TOTAL_FRAIS_CHANTIER,
    PRIX_REVIENT_INTER,
    FRAIS_DEVIS_SANS_SUITE,
    FRAIS_FINANCIERS,
    FRAIS_DE_GROUPE,
    PRIX_REVIENT,
    MARGE_VOULUE,
    PRIX_VENTE_ESTIME,
    GARANTIE_ENSEMBLIER,
    PRIX_VENTE_RETENUE,
    MARGE,
  ]);
  return result.insertId;
};

const getFapById = async devis_id => {
  const [rows] = await pool.query('SELECT * FROM FAP WHERE DEVIS_ID = ?', [devis_id]);
  console.log('rows du get fapbyid', rows);

  return rows[0];
};

const patchFap = async newData => {
  const sql = `
    UPDATE FAP
    SET
      MARGE_VOULUE = ?,
      GARANTIE_ENSEMBLIER = ?,
      PRIX_REVIENT_INTER = ?,
      FRAIS_DEVIS_SANS_SUITE = ?,
      FRAIS_FINANCIERS = ?,
      FRAIS_DE_GROUPE = ?,
      PRIX_REVIENT = ?,
      PRIX_VENTE_ESTIME = ?,
      PRIX_VENTE_RETENUE = ?,
      MARGE = ?
    WHERE FAP_ID = ?
  `;

  const params = [
    newData.MARGE_VOULUE,
    newData.GARANTIE_ENSEMBLIER,
    newData.PRIX_REVIENT_INTER,
    newData.FRAIS_DEVIS_SANS_SUITE,
    newData.FRAIS_FINANCIERS,
    newData.FRAIS_DE_GROUPE,
    newData.PRIX_REVIENT,
    newData.PRIX_VENTE_ESTIME,
    newData.PRIX_VENTE_RETENUE,
    newData.MARGE,
    newData.FAP_ID,
  ];

  const [result] = await pool.query(sql, params);
  return result;
};

export const Repository = {
  createFap,
  getFapById,
  patchFap,
};
