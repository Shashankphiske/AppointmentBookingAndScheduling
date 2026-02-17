import express from "express"
import { authController } from "../factory/authFactory.js";
import { errorHandler } from "../factory/utilFactory.js";
import { validate } from "../middleware/validation.js";
import { authLoginSchema, authLogoutSchema } from "../validators/auth.schema.js";

const authRouter = express.Router();

authRouter.post("/login", errorHandler.controllerWrapper(validate(authLoginSchema)), errorHandler.controllerWrapper(authController.login));
authRouter.post("/logout", errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.logout));

export { authRouter };