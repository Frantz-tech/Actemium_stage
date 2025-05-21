import { Router } from 'express';
import { Controller } from '../controller/devisController.js';

const router = Router();

// Liste des routes de Devis

router.post('/', Controller.createDevis);
router.get('/', Controller.getAllDevis);
router.get('/:id', Controller.getDevisById);
router.put('/:id', Controller.updateDevis);
router.delete('/:id', Controller.deleteDevis);

export default router;
