import { Router } from 'express';
import clientRoutes from './clientRoutes.js';
import commanditaireRoutes from './commanditaireRoutes.js';
import contratRoutes from './contratRoutes.js';
import domaineRoutes from './domaineRoutes.js';
import expertiseRoutes from './expertiseRoutes.js';
const router = Router();

router.use('/contrats', contratRoutes);
router.use('/expertises', expertiseRoutes);
router.use('/domaines', domaineRoutes);
router.use('/clients', clientRoutes);
router.use('/commanditaires', commanditaireRoutes);

export default router;
