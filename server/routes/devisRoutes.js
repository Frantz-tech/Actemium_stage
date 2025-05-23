import { Router } from 'express';
import { Controller } from '../controller/devisController.js';
import authenticate from '../middleware/authMiddleware.js';
import { verifyRaId } from '../middleware/verifyRaIdMiddleware.js';

const router = Router();

// Liste des routes de Devis

router.post('/', authenticate, Controller.createDevis);
router.get('/', authenticate, Controller.getAllDevis);
router.get('/ra/:id', authenticate, verifyRaId, Controller.getDevisByRaId);
router.get('/:id', authenticate, Controller.getDevisById);
router.put('/:id', authenticate, Controller.updateDevis);
router.delete('/:id', authenticate, Controller.deleteDevis);

export default router;
