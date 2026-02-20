import express from "express";
import { paymentController } from "../factory/paymentFactory";
import { errorHandler } from "../factory/utilFactory";
import { validate } from "../middleware/validation";
import { decodePaymentToken, generatePaymentToken } from "../validators/payment.schema";

const paymentRouter = express.Router();

paymentRouter.post("/conf", errorHandler.controllerWrapper(validate(decodePaymentToken)),errorHandler.controllerWrapper(paymentController.confirmPayment));
paymentRouter.post("/generate", errorHandler.controllerWrapper(validate(generatePaymentToken)), errorHandler.controllerWrapper(paymentController.generatePaymentToken))

export { paymentRouter };