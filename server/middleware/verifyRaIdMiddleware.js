export const verifyRaId = (req, res, next) => {
  const requestedRaId = req.params.id;
  const userRaId = req.user?.RA_ID;

  if (!userRaId) {
    return res.status(401).json({ error: 'Utilisateur non authentifé' });
  }
  if (requestedRaId !== userRaId) {
    return res.status(403).json({ error: 'Accès non authorisé' });
  }
  next();
};
