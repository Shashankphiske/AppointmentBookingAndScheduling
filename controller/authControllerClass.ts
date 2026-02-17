import type { authServiceClass } from "../service/authServiceClass.js";
import type { Request, Response, NextFunction } from "express"
import { serverError } from "../utils/errorUtil.js";
import { logActivity } from "../factory/utilFactory.js";

class authControllerClass {
    constructor ( private authServices : authServiceClass ) {}

    login = async ( req : Request, res : Response ) => {

        const token = await this.authServices.login(req.body);
        res.cookie("token", token, {maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true});

        return res.status(200).json({
            message : "Success"
        })
    }

    validateUser = async ( req : Request, res : Response, next : NextFunction ) => {
        if(req.cookies.token){
            await this.authServices.validateUser(req.cookies.token);
            return next();
        }

        throw new serverError(400, "Please validate yourself");
    }

    validateServiceProvider = async ( req : Request, res : Response, next : NextFunction ) => {
        if(req.cookies.token){
            await this.authServices.validateServiceProvider(req.cookies.token);
            return next();
        }

        throw new serverError(400, "Please validate yourself");
    }

    logout = async (req : Request, res : Response) => {

        res.clearCookie("token");

        logActivity.log("User logged out");

        return res.status(200).json({
            message : "Success"
        });
    }
}

export { authControllerClass }