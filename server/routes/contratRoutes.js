import { Router } from 'express';
import { Controller } from '../controller/contratController.js';

const router = Router();

// Liste des routes de Contrat

router.post('/', Controller.createContrat);
router.get('/', Controller.getAllContrats);
router.get('/:id', Controller.getContratById);
router.put('/:id', Controller.updateContrat);
router.delete('/:id', Controller.deleteContrat);

export default router;
