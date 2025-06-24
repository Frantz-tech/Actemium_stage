import { Router } from 'express';
import { Controller } from '../controller/fraisController.js';

const router = Router();

// Liste des routes de Frais

router.post('/', Controller.createFraisGlobaux);
router.get('/', Controller.getAllFraisGlobaux);
router.patch('/:id', /*verifyAdmin,*/ Controller.patchFraisGlobaux);
router.delete('/:fraisId', Controller.deleteFraisGlobaux);

export default router;
