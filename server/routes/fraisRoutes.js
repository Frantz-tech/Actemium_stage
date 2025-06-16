import { Router } from 'express';
import { Controller } from '../controller/fraisController.js';

const router = Router();

// Liste des routes de Frais

// router.post('/', Controller.createFrais);
router.get('/', Controller.getAllFrais);
// router.get('/:id', Controller.getFraisById);
// router.put('/:id', Controller.updateFrais);
// router.delete('/:id', Controller.deleteFrais);

export default router;
