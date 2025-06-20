import { Router } from 'express';
import { Controller } from '../controller/devisController.js';
import { verifyAdmin } from '../middleware/adminMiddleware.js';
import authenticate from '../middleware/authMiddleware.js';
import { verifyRaId } from '../middleware/verifyRaIdMiddleware.js';

const router = Router();

// Liste des routes de Devis

router.post('/', authenticate, Controller.createDevis);
router.get('/', verifyAdmin, Controller.getAllDevis);
router.get('/ra/:id', authenticate, verifyRaId, Controller.getDevisByRaId);
router.get('/:id', authenticate, Controller.getDevisById);
router.get('/:id', authenticate, Controller.getDevisByCmdt);
router.put('/:id', authenticate, Controller.updateDevis);
router.delete('/:id', authenticate, Controller.deleteDevis);
router.patch('/:id', authenticate, Controller.patchDevis);
export default router;
