import { authUtil } from "../factory/authFactory.js";
import type { baseAuth } from "../repository/auth/baseAuth.js";
import type { userGeneralMethodsClass } from "../repository/user/userGeneralMethods.js";
import bcrypt from "bcrypt";
import { serverError } from "../utils/errorUtil.js";
import jwt from "jsonwebtoken";
import { logActivity } from "../factory/utilFactory.js";

class authServiceClass {
    constructor ( private userService : userGeneralMethodsClass ) {};

    login = async ( data : baseAuth ) => {
        const user = await this.userService.getByEmail(data.email);
        if(user){
            const pass = user.password;
            const flag = await bcrypt.compare( data.password, pass );

            if(flag){
                logActivity.log(`User logged in with the id : ${user._id}`);
                const token = authUtil.generateToken( user?._id?.toString() ?? "" );
                return token;
            }

            throw new serverError(400, "Incorrect credentials or email");
        }

        throw new serverError(400, "Incorrect credentials or email");
    }

    validate = async ( token : string ) => {
        const decoded = jwt.verify(token, process.env.JWTSECRET as string) as { id : string };

        if(decoded.id){
            const user = await this.userService.get(decoded.id);
            if(user){
                return;
            }

            throw new serverError(400, "Please Login");
        }

        throw new serverError(400, "Please Login");
    }
}

export { authServiceClass };

