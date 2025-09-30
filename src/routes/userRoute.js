import express from 'express';
import { getAllUsersHandler, getUsersByIdHandler, addUsersHandler } from '../handler/userHandler.js';

const userRouter = express.Router();

userRouter.get('/users', getAllUsersHandler);
userRouter.get('/users/:id', getUsersByIdHandler);
userRouter.post('/users', addUsersHandler);

export default userRouter;