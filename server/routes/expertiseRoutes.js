import { Router } from 'express';
import { Controller } from '../controller/expertiseController.js';

const router = Router();

// Liste des routes de Expertise

router.post('/', Controller.createExpertise);
router.get('/', Controller.getAllExpertises);
router.get('/:id', Controller.getExpertiseById);
router.put('/:id', Controller.updateExpertise);
router.delete('/:id', Controller.deleteExpertise);

export default router;
