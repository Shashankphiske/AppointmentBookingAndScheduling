import type { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serverError } from "./errorUtil";

class authUtilClass {

    hashPass = async (pass : string) => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(pass, salt);
        return hashed;
    }

    decodeToken = ( token : string ) => {
        return jwt.verify(token, process.env.JWTSECRET as string) as { id : string, role : string }
    }

    generateToken = (id : string, role : string) => {
        return jwt.sign( { id, role }, process.env.JWTSECRET as string, { expiresIn: "1d" });
    }

    generateForgetToken = ( mail : string, role : string ) => {
        return jwt.sign( {mail, role}, process.env.JWTSECRET as string, { expiresIn : "1d" } );
    }

    decodeForgetToken = (token : string) => {
        return jwt.verify(token, process.env.JWTSECRET as string ) as { mail : string, role : string }
    }

    logout = (req : Request, res : Response) => {
        res.clearCookie("token");

        return res.status(200).json({
            message : "Successfully logged out"
        });
    }

    checkAuthorization = ( token : string, auth : string ) => {
        const { id, role } = this.decodeToken(token);
        if(role == auth){
            return;
        }

        throw new serverError(400, "Not Authorized");
    }
}

export { authUtilClass }