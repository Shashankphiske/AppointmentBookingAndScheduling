import express from "express";
import { errorHandler } from "../factory/utilFactory";
import { appointmentController } from "../factory/appointmentFactory";
import { validate } from "../middleware/validation";
import { createAppointmentSchema, getAppointmentSchema, updateAppointmentSchema } from "../validators/appointment.schema";
import { authController } from "../factory/authFactory";
import { authLogoutSchema } from "../validators/auth.schema";
import { userRole } from "../utils/constantUtils";

const appointmentRouter = express.Router();

appointmentRouter.use("/create", errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validateForAppointment(userRole)));

appointmentRouter.post("/create", errorHandler.controllerWrapper(validate(createAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.createAppointment));

appointmentRouter.use(errorHandler.controllerWrapper(validate(authLogoutSchema)), errorHandler.controllerWrapper(authController.validate("*")));

appointmentRouter.post("/fetch", errorHandler.controllerWrapper(validate(getAppointmentSchema)),errorHandler.controllerWrapper(appointmentController.getAppointment));
appointmentRouter.get("/fetch", errorHandler.controllerWrapper(appointmentController.getAllAppointments));
appointmentRouter.put("/update", errorHandler.controllerWrapper(validate(updateAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.updateAppointment));
appointmentRouter.delete("/", errorHandler.controllerWrapper(validate(getAppointmentSchema)), errorHandler.controllerWrapper(appointmentController.deleteAppointment));

export { appointmentRouter };