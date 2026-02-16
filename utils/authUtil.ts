import type { Request, Response, NextFunction } from "express"
import { serverError } from "./errorUtil.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

class authUtilClass {
    validate = async (req : Request, res : Response, next : NextFunction) => {
        const token = req.cookies.token;

        if(!token){
            throw new serverError(400, "Please validate yourself by logging in or registering if new user");
        }

        const decoded = jwt.verify(token, process.env.JWTSECRET as string) as { id : string };

        const user = await User.findById(decoded.id);
        if(!user){
            throw new serverError(400, "Please validate yourself by logging in or registering if new user");
        }

        next();

    }

    hashPass = async (pass : string) => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(pass, salt);
        return hashed;
    }

    generateToken = (id : string) => {
        return jwt.sign(id, process.env.JWTSECRET as string, { expiresIn: "1d" });
    }

    logout = (req : Request, res : Response) => {
        res.clearCookie("token");

        return res.status(200).json({
            message : "Successfully logged out"
        });
    }
}

export { authUtilClass }