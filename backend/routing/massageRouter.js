import express from 'express';
import { isAuthanication } from '../middleware/AuthMiddleware.js';
import { sendmassage, getmassage } from '../controller/massageController.js';
export const massageRouter = express.Router();


massageRouter.post('/send/:recieverId', isAuthanication, sendmassage);
massageRouter.get('/get/:recieverId', isAuthanication, getmassage);
