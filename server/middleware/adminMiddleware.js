import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'Administrateur') {
      return res.status(403).json({ message: 'Accès interdit : admin requis' });
    }

    req.user = decoded; // tu peux réutiliser ces infos plus tard
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide', error });
  }
};
