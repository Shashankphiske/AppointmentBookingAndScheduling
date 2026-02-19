import { emailClass, smsClass } from "../utils/emailUtil";
import { errorHandlerClass, globalErrorHandlerClass } from "../utils/errorUtil";
import { inMemoryLockClass } from "../utils/inMemoryLockUtils";
import { logActivityClass, logErrorClass } from "../utils/logUtil";
import { validationUtilsClass } from "../utils/validationUtils";

const logError = new logErrorClass();
const logActivity = new logActivityClass();

const email = new emailClass();
const sms = new smsClass();

const globalErrorHandler = new globalErrorHandlerClass();
const errorHandler = new errorHandlerClass();

const validationUtil = new validationUtilsClass();

const lockManager = new inMemoryLockClass();

export { logError, logActivity, email, sms, globalErrorHandler, errorHandler, validationUtil, lockManager };