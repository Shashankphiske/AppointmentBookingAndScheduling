import type { Request, Response, NextFunction } from "express";
import { logError } from "../factory/utilFactory";

class serverError extends Error{
    public status : number;

    constructor (status : number, message : string) {
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype); // it fixes the prototype chain when built in class extends Error
        Error.captureStackTrace(this); // it captures the stack trace and attaches it to our error
    }
}

class errorHandlerClass {
    controllerWrapper = ( fn : any) => {
        return (req : Request, res : Response, next : NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        }
    }
}

class globalErrorHandlerClass {

    handleError = (err : any, req : Request, res : Response, next : NextFunction) => {

        logError.log(`Internal Server Error - Status : ${err.status} with the message : ${err.message}`);

        return res.status(err.status).json({
            message : err.message
        })
    }

    validateBody = (req : Request, res : Response, next : NextFunction) => {
        if(req.body || req.method == "GET"){
            return next();
        }

        throw new serverError(400, "Please provide data");
    }
}



export { serverError, errorHandlerClass, globalErrorHandlerClass };