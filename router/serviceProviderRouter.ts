import express from "express"
import { errorHandler } from "../factory/utilFactory";
import { serviceProviderController } from "../factory/serviceProviderFactory";
import { validate } from "../middleware/validation";
import { createServicePSchema, deleteServicePSchema, getServicePSchema } from "../validators/serviceProvider.schema";
import { authController } from "../factory/authFactory";
import { authLogoutSchema } from "../validators/auth.schema";

const serviceProviderRouter = express.Router();

serviceProviderRouter.post("/create", errorHandler.controllerWrapper(validate(createServicePSchema)),errorHandler.controllerWrapper(serviceProviderController.createServiceProvider));
serviceProviderRouter.get("/fetch", errorHandler.controllerWrapper(serviceProviderController.getAllServiceProvider));
serviceProviderRouter.post("/fetch", errorHandler.controllerWrapper(validate(getServicePSchema)), errorHandler.controllerWrapper(serviceProviderController.getServiceProvider));

serviceProviderRouter.use(errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validate("serviceProvider")));

serviceProviderRouter.delete("/", errorHandler.controllerWrapper(validate(deleteServicePSchema)), errorHandler.controllerWrapper(serviceProviderController.deleteServiceProvider));

export { serviceProviderRouter };