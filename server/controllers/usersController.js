import User from '../models/usersModel.js';
import bcrypt from 'bcrypt';
export const register = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // console.log(user);
    return res.json({ status: true, user });
  } catch (error) {
    console.log('=====================');
    console.log(error.name);
    console.log('=====================');
    // let data = new Error(error);
    // console.log(data);
    return res.json({ status: false });
  }
};
