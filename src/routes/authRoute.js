import express from "express";
import { registerHandler } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/auth/register", registerHandler);


// PASTIKAN INI ADALAH authRouter
export default authRouter;