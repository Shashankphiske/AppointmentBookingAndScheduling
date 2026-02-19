import express from "express";
import { errorHandler } from "../factory/utilFactory";
import { authLogoutSchema } from "../validators/auth.schema";
import { authController } from "../factory/authFactory";
import { adminRole } from "../utils/constantUtils";
import { reportController } from "../factory/reportFactory";
import { validate } from "../middleware/validation";

const reportRouter = express.Router();

reportRouter.use(errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validate(adminRole)))

reportRouter.get("/", errorHandler.controllerWrapper(reportController.generateReport));

export { reportRouter }