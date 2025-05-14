import { Router } from 'express';
import { Controller } from '../controller/clientController.js';

const router = Router();

// Liste des routes de Client

router.post('/', Controller.createClient);
router.get('/', Controller.getAllClients);
router.get('/:id', Controller.getClientById);
router.put('/:id', Controller.updateClient);
router.delete('/:id', Controller.deleteClient);

export default router;
