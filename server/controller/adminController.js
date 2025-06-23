import jwt from 'jsonwebtoken';
import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/adminService.js';

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Service.authenticateAdmin(email, password);

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
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  loginAdmin,
};
