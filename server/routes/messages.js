import { addMessage, getMessages } from '../controllers/messageController.js';
import express from 'express';
import { errorHanlder, validObjectReq } from '../utils/errorHandler.js';

const router = express.Router();

router.post('/addmsg/', addMessage, errorHanlder);
router.post('/getmsg/', getMessages, errorHanlder);

export default router;
