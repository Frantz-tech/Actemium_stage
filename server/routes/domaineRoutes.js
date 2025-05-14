import { Router } from 'express';
import { Controller } from '../controller/domaineController.js';

const router = Router();

// Liste des routes de Domaine

router.post('/', Controller.createDomaine);
router.get('/', Controller.getAllDomaines);
router.get('/:id', Controller.getDomaineById);
router.put('/:id', Controller.updateDomaine);
router.delete('/:id', Controller.deleteDomaine);

export default router;
