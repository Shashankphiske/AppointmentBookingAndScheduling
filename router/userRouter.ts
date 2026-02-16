import express from "express"
import { errorHandler, globalErrorHandler } from "../factory/utilFactory.js";
import { userController } from "../factory/userFactory.js";

const userRouter = express.Router();

userRouter.post("/create", errorHandler.controllerWrapper(userController.createUser));
userRouter.post("/fetch", errorHandler.controllerWrapper(userController.getUser));
userRouter.get("/fetch", errorHandler.controllerWrapper(userController.getAllUsers));
userRouter.delete("/", errorHandler.controllerWrapper(userController.deleteUser));

export { userRouter };