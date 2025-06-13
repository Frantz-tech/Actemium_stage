import { Router } from 'express';
import { Controller } from '../controller/commanditaireController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Liste des routes de Commanditaire

router.post('/', upload.single('logo'), Controller.createCommanditaire);
router.get('/', Controller.getAllCommanditaires);
router.get('/:id', Controller.getCommanditaireById);
router.put('/:id', Controller.updateCommanditaire);
router.delete('/:id', Controller.deleteCommanditaire);

export default router;
