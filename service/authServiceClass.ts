import { authUtil } from "../factory/authFactory.js";
import type { baseAuth } from "../repository/auth/baseAuth.js";
import type { userGeneralMethodsClass } from "../repository/user/userGeneralMethods.js";
import bcrypt from "bcrypt";
import { serverError } from "../utils/errorUtil.js";
import { logActivity, email } from "../factory/utilFactory.js";
import type { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods.js";
import type { baseServiceProvider } from "../repository/serviceProvider/baseServiceProvider.js";
import type { baseUser } from "../repository/user/baseUser.js";

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
                    const token = authUtil.generateToken( user?._id?.toString() ?? "", "user" );
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
                    logActivity.log(`Service PRovider logged in with the id : ${serviceprovider._id}`);
                    const token = authUtil.generateToken( serviceprovider?._id?.toString() ?? "", "serviceProvider" );
                    return token;
                }

                throw new serverError(400, "Incorrect credentials or email");
            }

            throw new serverError(400, "Incorrect credentials or email");
        }
    }

    validate = async ( id : string, role : string ) => {
        if(role == "user"){
            const user = await this.userService.get(id);
            if(user.email){
                return;
            }

            throw new serverError(400, "Please Validate Yourself");
        }else{
            const serviceprovider = await this.serviceProviderService.get(id);
            if(serviceprovider.email){
                return;
            }
            throw new serverError(400, "Please Validate Yourself");
        }
    }

    forget = async (mail : string, role : string) => {
        let person : any;
        if(role == "user"){
            person = await this.userService.getByEmail(mail);
        }else if(role == "serviceProvider"){
            person = await this.serviceProviderService.getByEmail(mail);
        }

        if(!person._id) throw new serverError(400, "No user or service provider found with the email");
        const token = authUtil.generateForgetToken(mail, role);
        email.send(mail, `to reset pass follow the link : http:/localhost:${process.env.PORT}/${token}`);
        return `to reset pass follow the link : http:/localhost:${process.env.PORT}/auth/resetpass/${token}`;
    }

    resetPass = async (token : string, password : string) => {
        const { mail, role } = authUtil.decodeForgetToken(token);
        const hashedPass = await authUtil.hashPass(password);
        let person : any;
        if(role == "user"){
            person = await this.userService.getByEmail(mail);
            if(!person._id) throw new serverError(400, "No user or service provider found with the email");
            const data = <baseUser>{}
            person = await this.userService.update({
                ...data,
                email : mail,
                password : hashedPass,
                passFlag : true
            })

        }else if(role == "serviceProvider"){
            person = await this.serviceProviderService.getByEmail(mail);
            if(!person._id) throw new serverError(400, "No user or service provider found with the email");
            const data = <baseServiceProvider>{}
            person = await this.serviceProviderService.update({
                ...data,
                email : mail,
                password : hashedPass,
                passFlag : true
            });
        }
        logActivity.log("Password Changed");
        return person;
        
    }
}

export { authServiceClass };

