import express from "express";
import { errorHandler } from "../factory/utilFactory.js";
import { appointmentController } from "../factory/appointmentFactory.js";
import { validate } from "../middleware/validation.js";
import { createAppointmentSchema, getAppointmentSchema, updateAppointmentSchema } from "../validators/appointment.schema.js";
import { authController } from "../factory/authFactory.js";
import { authLogoutSchema } from "../validators/auth.schema.js";

const appointmentRouter = express.Router();
console.log("In router")
appointmentRouter.use(errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validate("*")));

appointmentRouter.post("/create", errorHandler.controllerWrapper(validate(createAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.createAppointment));
appointmentRouter.post("/fetch", errorHandler.controllerWrapper(validate(getAppointmentSchema)),errorHandler.controllerWrapper(appointmentController.getAppointment));
appointmentRouter.get("/fetch", errorHandler.controllerWrapper(appointmentController.getAllAppointments));
appointmentRouter.put("/update", errorHandler.controllerWrapper(validate(updateAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.updateAppointment));
appointmentRouter.delete("/", errorHandler.controllerWrapper(validate(getAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.deleteAppointment));

export { appointmentRouter };