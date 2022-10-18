import User from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import { validObjectReq } from '../utils/errorHandler.js';
import { Buffer } from 'buffer';
import axios from 'axios';
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
      return res.json({ status: true, user: others });
    } else return 0;
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    if (validObjectReq(['password', 'username'], req, res)) {
      const { username, password: passwordData } = req.body;
      const user = await User.findOne({ username });
      if (!user) return next({ name: 'LoginError' });
      const isPasswordValid = await bcrypt.compare(passwordData, user.password);
      if (!isPasswordValid) return next({ name: 'LoginError' });
      const { password, ...others } = user._doc;
      return res.json({ status: true, user: others });
    } else return 0;
  } catch (error) {
    next(error);
  }
};
export const getAvatar = async (req, res, next) => {
  try {
    const api = `https://api.multiavatar.com/4645646`;
    const data = [];
    for (let i = 0; i < 2; i++) {
      const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=${process.env.MULTIAVATAR}`);
      const buffer = new Buffer.from(image.data);
      data.push(buffer.toString('base64'));
    }

    return res.json({ status: true, data });
  } catch (error) {
    next(error);
  }
};
export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select(['email', 'username', 'avatarImage', '_id']);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
export const logOut = async (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: 'User id is required ' });
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
