import express from "express"
import { errorHandler, globalErrorHandler } from "../factory/utilFactory.js";
import { serviceProviderController } from "../factory/serviceProviderFactory.js";

const serviceProviderRouter = express.Router();

serviceProviderRouter.post("/create", errorHandler.controllerWrapper(serviceProviderController.createServiceProvider));
serviceProviderRouter.post("/fetch", errorHandler.controllerWrapper(serviceProviderController.getServiceProvider));
serviceProviderRouter.get("/fetch", errorHandler.controllerWrapper(serviceProviderController.getAllServiceProvider));
serviceProviderRouter.delete("/", errorHandler.controllerWrapper(serviceProviderController.deleteServiceProvider));

export { serviceProviderRouter };