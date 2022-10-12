import express from 'express';
import { login, register } from '../controllers/usersController.js';
import { errorHanlder, validObjectReq } from '../utils/errorHandler.js';

const router = express.Router();

router.post('/register', register, errorHanlder);
router.post('/login', login, errorHanlder);
export default router;
