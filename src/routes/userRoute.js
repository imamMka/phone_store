import express from "express";
// import {
//   getAllUsersHandler,
//   deleteUsersHandler,
//   getUsersByIdHandler,
//   addUsersHandler,
//   updateUsersHandler,
// } from "../handler/userHandler.js";
import {
 getAllUsersHandler,
 getUsersByIdHandler,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUsersByIdHandler);
// userRouter.post("/users", addUsersHandler);
// userRouter.put("/users/:id", updateUsersHandler);
// userRouter.delete("/users/:id", deleteUsersHandler);

export default userRouter;
