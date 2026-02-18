import express from "express"
import { authController } from "../factory/authFactory.js";
import { errorHandler } from "../factory/utilFactory.js";
import { validate } from "../middleware/validation.js";
import { authForgetSchema, authLoginSchema, authLogoutSchema, authResetPassSchema } from "../validators/auth.schema.js";

const authRouter = express.Router();

authRouter.post("/login", errorHandler.controllerWrapper(validate(authLoginSchema)), errorHandler.controllerWrapper(authController.login));
authRouter.get("/logout", errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.logout));
authRouter.post("/forgetpass", errorHandler.controllerWrapper(validate(authForgetSchema)), errorHandler.controllerWrapper(authController));
authRouter.post("/resetpass/:token", errorHandler.controllerWrapper(validate(authResetPassSchema)), errorHandler.controllerWrapper(authController.resetPass));

export { authRouter };