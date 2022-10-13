import express from 'express';
import { getAvatar, login, register, setAvatar } from '../controllers/usersController.js';
import { errorHanlder, validObjectReq } from '../utils/errorHandler.js';

const router = express.Router();
router.get('/get-avatar', getAvatar, errorHanlder);
router.post('/set-avatar/:id', setAvatar, errorHanlder);
router.post('/register', register, errorHanlder);
router.post('/login', login, errorHanlder);
export default router;
