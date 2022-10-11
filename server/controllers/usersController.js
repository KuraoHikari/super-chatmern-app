import User from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import { validObjectReq } from '../utils/errorHandler.js';
export const register = async (req, res, next) => {
  try {
    if (validObjectReq(['password'], req, res)) {
      const { username, email, password: passwordData } = req.body;
      const hashedPassword = await bcrypt.hash(passwordData, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      const { password, ...others } = user._doc;
      return res.json({ status: true, others });
    } else return 0;
  } catch (error) {
    next(error);
  }
};
