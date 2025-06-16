import { Router } from 'express';
import { Controller } from '../controller/fapController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = Router();

// Liste des routes de Devis

router.post('/', authenticate, Controller.createFap);
router.get('/:devis_id', authenticate, Controller.getFapById);

export default router;
