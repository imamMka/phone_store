import express from 'express';
import { getAllUsersHandler, getUsersByIdHandler } from '../handler/userHandler.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsersHandler);
userRouter.get('/:id', getUsersByIdHandler);
