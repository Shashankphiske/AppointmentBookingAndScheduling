import express from "express";
import { errorHandler } from "../factory/utilFactory.js";
import { appointmentController } from "../factory/appointmentFactory.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/create", errorHandler.controllerWrapper(appointmentController.createAppointment));
appointmentRouter.post("/fetch", errorHandler.controllerWrapper(appointmentController.getAppointment));
appointmentRouter.get("/fetch", errorHandler.controllerWrapper(appointmentController.getAllAppointments));
appointmentRouter.delete("/", errorHandler.controllerWrapper(appointmentController.deleteAppointment));

export { appointmentRouter };