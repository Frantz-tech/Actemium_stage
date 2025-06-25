import jwt from 'jsonwebtoken';
import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/adminService.js';

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Service.authenticateAdmin(email, password);

    if (admin.errors && admin.errors.length > 0) {
      return res.status(400).json({ errors: admin.errors });
    }

    // eslint-disable-next-line no-unused-vars
    const { PASSWORD: _PASSWORD, ...adminSansPassword } = admin;
    const token = jwt.sign(
      {
        id: admin.ADMIN_ID,
        email: admin.EMAIL,
        role: admin.ROLE,
      },

      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    sendSuccessResponse(res, 200, 'Connexion Réussie', {
      user: adminSansPassword,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const Controller = {
  loginAdmin,
};
