import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import clientRoutes from './clientRoutes.js';
import commanditaireRoutes from './commanditaireRoutes.js';
import contratRoutes from './contratRoutes.js';
import devisRoutes from './devisRoutes.js';
import domaineRoutes from './domaineRoutes.js';
import expertiseRoutes from './expertiseRoutes.js';
import userRoutes from './userRoutes.js';
const router = Router();

router.use('/contrats', contratRoutes);
router.use('/expertises', expertiseRoutes);
router.use('/domaines', domaineRoutes);
router.use('/clients', clientRoutes);
router.use('/commanditaires', commanditaireRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/devis', devisRoutes);

export default router;
