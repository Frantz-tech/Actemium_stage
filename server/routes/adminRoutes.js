import { Router } from 'express';
import loginAdmin from '../controller/adminController.js';
import { sendSuccessResponse } from '../helper/responseHelper.js';
import { verifyAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

// Route pour la connexion

router.post('/login', loginAdmin);

// Route privée
router.get('/dashboard', verifyAdmin, (req, res) => {
  sendSuccessResponse(res, 200, " Bienvenue dans l'espace admin sécurisé ", {
    user: req.user,
  });
});

export default router;
