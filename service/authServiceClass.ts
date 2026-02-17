import { authUtil } from "../factory/authFactory.js";
import type { baseAuth, baseToken } from "../repository/auth/baseAuth.js";
import type { userGeneralMethodsClass } from "../repository/user/userGeneralMethods.js";
import bcrypt from "bcrypt";
import { serverError } from "../utils/errorUtil.js";
import jwt from "jsonwebtoken";
import { logActivity } from "../factory/utilFactory.js";
import type { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods.js";

class authServiceClass {
    constructor ( private userService : userGeneralMethodsClass, private serviceProviderService : serviceproviderGeneralMethodsClass ) {};

    login = async ( data : baseAuth ) => {
        if(data.role == "user"){
            const user = await this.userService.getByEmail(data.email);
            if(user.email){
                const pass = user.password;
                const flag = await bcrypt.compare( data.password, pass );

                if(flag){
                    logActivity.log(`User logged in with the id : ${user._id}`);
                    const token = authUtil.generateToken( user?._id?.toString() ?? "", "serviceProvider" );
                    return token;
                }

                throw new serverError(400, "Incorrect credentials or email");
            }

            throw new serverError(400, "Incorrect credentials or email");
        }else{
            const serviceprovider = await this.serviceProviderService.getByEmail(data.email);
            if(serviceprovider.email){
                const pass = serviceprovider.password;
                const flag = await bcrypt.compare( data.password, pass );

                if(flag){
                    logActivity.log(`User logged in with the id : ${serviceprovider._id}`);
                    const token = authUtil.generateToken( serviceprovider?._id?.toString() ?? "", "serviceProvider" );
                    return token;
                }

                throw new serverError(400, "Incorrect credentials or email");
            }

            throw new serverError(400, "Incorrect credentials or email");
        }
    }

    validateUser = async ( token : string ) => {
        const decoded = jwt.verify(token, process.env.JWTSECRET as string) as { id : string, role : string };

        if(decoded.id){
            const user = await this.userService.get(decoded.id);
            if(user.email){
                return;
            }

            throw new serverError(400, "Not Authorized");
        }

        throw new serverError(400, "Please Login");
    }

    validateServiceProvider = async ( token : string ) => {
        const decoded = jwt.verify(token, process.env.JWTSECRET as string) as { id : string, role : string };
        if(decoded.id){
            const serviceprovider = await this.serviceProviderService.get(decoded.id);
            if(serviceprovider.email){
                return;
            }

            throw new serverError(400, "Not Authorized");
        }

        throw new serverError(400, "Please Login");
    }
}

export { authServiceClass };

