import { emailClass, smsClass } from "../utils/emailUtil.js";
import { errorHandlerClass, globalErrorHandlerClass } from "../utils/errorUtil.js";
import { logActivityClass, logErrorClass } from "../utils/logUtil.js";

const logError = new logErrorClass();
const logActivity = new logActivityClass();

const email = new emailClass();
const sms = new smsClass();

const globalErrorHandler = new globalErrorHandlerClass();
const errorHandler = new errorHandlerClass();

export { logError, logActivity, email, sms, globalErrorHandler, errorHandler };