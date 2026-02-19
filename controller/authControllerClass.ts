import type { authServiceClass } from "../service/authServiceClass";
import type { Request, Response, NextFunction } from "express"
import { serverError } from "../utils/errorUtil";
import { logActivity } from "../factory/utilFactory";
import { authUtil } from "../factory/authFactory";

class authControllerClass {
    constructor ( private authServices : authServiceClass ) {}

    login = async ( req : Request, res : Response ) => {

        const token = await this.authServices.login(req.body);
        res.cookie("token", token, {maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true});

        return res.status(200).json({
            message : "Success"
        })
    }

    validate = (route : string) => {
        return async ( req : Request, res : Response, next : NextFunction) => {
            const { id, role } = authUtil.decodeToken(req.cookies.token);
            if((role === route && id === req.body.id) || route === "*"){
                await this.authServices.validate(id, role);
                return next();
            }

            throw new serverError(400, "Please validate yourself");
        }
    }

    logout = async (req : Request, res : Response) => {

        res.clearCookie("token");

        logActivity.log("User logged out");

        return res.status(200).json({
            message : "Success"
        });
    }

    forget = async (req : Request, res : Response) => {
        const data = await this.authServices.forget(req.body.mail, req.body.role);
        return res.send(data);
    }

    resetPass = async (req : Request, res : Response) => {
        const token = req.params.token?.toString();
        const person = await this.authServices.resetPass(token ?? "", req.body.password);
        return res.send(person);
    }
}

export { authControllerClass }