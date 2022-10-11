import express from 'express';
import { register } from '../controllers/usersController.js';
import { errorHanlder, validObjectReq } from '../utils/errorHandler.js';

const router = express.Router();

router.post('/register', register, errorHanlder);
export default router;
