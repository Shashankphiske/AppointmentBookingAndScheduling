import express from "express"
import { errorHandler } from "../factory/utilFactory";
import { userController } from "../factory/userFactory";
import { validate } from "../middleware/validation";
import { createUserSchema, deleteUserSchema, getUserSchema } from "../validators/user.schema";
import { authController } from "../factory/authFactory";
import { authLogoutSchema } from "../validators/auth.schema";

const userRouter = express.Router();

userRouter.post("/create", errorHandler.controllerWrapper(validate(createUserSchema)), errorHandler.controllerWrapper(userController.createUser));
userRouter.get("/fetch", errorHandler.controllerWrapper(userController.getAllUsers));
userRouter.post("/fetch", errorHandler.controllerWrapper(validate(getUserSchema)), errorHandler.controllerWrapper(userController.getUser));

userRouter.use(errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validate("user")));

userRouter.delete("/", errorHandler.controllerWrapper(validate(deleteUserSchema)), errorHandler.controllerWrapper(userController.deleteUser));

export { userRouter };