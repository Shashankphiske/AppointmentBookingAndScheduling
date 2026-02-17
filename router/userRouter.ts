import express from "express"
import { errorHandler } from "../factory/utilFactory.js";
import { userController } from "../factory/userFactory.js";
import { validate } from "../middleware/validation.js";
import { createUserSchema, deleteUserSchema, getUserSchema } from "../validators/user.schema.js";
import { authController } from "../factory/authFactory.js";
import { authLogoutSchema } from "../validators/auth.schema.js";

const userRouter = express.Router();

userRouter.post("/create", errorHandler.controllerWrapper(validate(createUserSchema)), errorHandler.controllerWrapper(userController.createUser));

userRouter.use(errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validate("user")));

userRouter.post("/fetch", errorHandler.controllerWrapper(validate(getUserSchema)), errorHandler.controllerWrapper(userController.getUser));
userRouter.get("/fetch", errorHandler.controllerWrapper(userController.getAllUsers));
userRouter.delete("/", errorHandler.controllerWrapper(validate(deleteUserSchema)), errorHandler.controllerWrapper(userController.deleteUser));

export { userRouter };