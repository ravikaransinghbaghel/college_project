import { getProfile, getusers, login, logout, register, forgatPass, isEmailVerification, searchuser } from '../controller/userConroller.js';
import express from 'express';
import { isAuthanication } from '../middleware/AuthMiddleware.js';
export const userRouter = express.Router();


userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/isemailverufy', isAuthanication, isEmailVerification);
userRouter.post('/forgot', forgatPass);
userRouter.get('/users',isAuthanication, getusers);
userRouter.get('/get-profile', isAuthanication, getProfile);
userRouter.post('/logout', isAuthanication, logout); 
userRouter.get('/search', isAuthanication, searchuser); 