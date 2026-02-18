import { emailClass, smsClass } from "../utils/emailUtil.js";
import { errorHandlerClass, globalErrorHandlerClass } from "../utils/errorUtil.js";
import { logActivityClass, logErrorClass } from "../utils/logUtil.js";
import { validationUtilsClass } from "../utils/validationUtils.js";

const logError = new logErrorClass();
const logActivity = new logActivityClass();

const email = new emailClass();
const sms = new smsClass();

const globalErrorHandler = new globalErrorHandlerClass();
const errorHandler = new errorHandlerClass();

const validationUtil = new validationUtilsClass();

export { logError, logActivity, email, sms, globalErrorHandler, errorHandler, validationUtil };