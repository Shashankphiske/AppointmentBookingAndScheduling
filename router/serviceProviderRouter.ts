import express from "express"
import { errorHandler, globalErrorHandler } from "../factory/utilFactory.js";
import { serviceProviderController } from "../factory/serviceProviderFactory.js";
import { validate } from "../middleware/validation.js";
import { createServicePSchema, deleteServicePSchema, getServicePSchema } from "../validators/serviceProvider.schema.js";

const serviceProviderRouter = express.Router();

serviceProviderRouter.post("/create", errorHandler.controllerWrapper(validate(createServicePSchema)),errorHandler.controllerWrapper(serviceProviderController.createServiceProvider));
serviceProviderRouter.post("/fetch", errorHandler.controllerWrapper(validate(getServicePSchema)), errorHandler.controllerWrapper(serviceProviderController.getServiceProvider));
serviceProviderRouter.get("/fetch", errorHandler.controllerWrapper(serviceProviderController.getAllServiceProvider));
serviceProviderRouter.delete("/", errorHandler.controllerWrapper(validate(deleteServicePSchema)), errorHandler.controllerWrapper(serviceProviderController.deleteServiceProvider));

export { serviceProviderRouter };