import express from "express"
import { authController } from "../factory/authFactory";
import { errorHandler } from "../factory/utilFactory";
import { validate } from "../middleware/validation";
import { authForgetSchema, authLoginSchema, authLogoutSchema, authResetPassSchema } from "../validators/auth.schema";

const authRouter = express.Router();

authRouter.post("/login", errorHandler.controllerWrapper(validate(authLoginSchema)), errorHandler.controllerWrapper(authController.login));
authRouter.get("/logout", errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.logout));
authRouter.post("/forgetpass", errorHandler.controllerWrapper(validate(authForgetSchema)), errorHandler.controllerWrapper(authController.forget));
authRouter.post("/resetpass/:token", errorHandler.controllerWrapper(validate(authResetPassSchema)), errorHandler.controllerWrapper(authController.resetPass));

export { authRouter };