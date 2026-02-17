import express from "express";
import { errorHandler } from "../factory/utilFactory.js";
import { appointmentController } from "../factory/appointmentFactory.js";
import { validate } from "../middleware/validation.js";
import { createAppointmentSchema, getAppointmentSchema, updateAppointmentSchema } from "../validators/appointment.schema.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/create", errorHandler.controllerWrapper(validate(createAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.createAppointment));
appointmentRouter.post("/fetch", errorHandler.controllerWrapper(validate(getAppointmentSchema)),errorHandler.controllerWrapper(appointmentController.getAppointment));
appointmentRouter.get("/fetch", errorHandler.controllerWrapper(appointmentController.getAllAppointments));
appointmentRouter.put("/update", errorHandler.controllerWrapper(validate(updateAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.updateAppointment));
appointmentRouter.delete("/", errorHandler.controllerWrapper(validate(getAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.deleteAppointment));

export { appointmentRouter };