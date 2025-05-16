import { Router } from 'express';
import { Controller } from '../controller/userController.js';

const router = Router();

// Liste des routes de User

router.post('/', Controller.createUser);
router.get('/', Controller.getAllUsers);
router.get('/roles', Controller.getAllRole);
router.get('/:id', Controller.getUserById);
router.put('/:id', Controller.updateUser);
router.delete('/:id', Controller.deleteUser);

export default router;
