import { Router } from 'express';
import contratRoutes from './contratRoutes.js';
const router = Router();

router.use('/contrats', contratRoutes);

export default router;
