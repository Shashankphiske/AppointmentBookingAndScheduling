import { authUtil } from "../factory/authFactory";
import type { baseAuth } from "../repository/auth/baseAuth";
import type { userGeneralMethodsClass } from "../repository/user/userGeneralMethods";
import bcrypt from "bcrypt";
import { serverError } from "../utils/errorUtil";
import { logActivity, email } from "../factory/utilFactory";
import type { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods";
import type { baseServiceProvider } from "../repository/serviceProvider/baseServiceProvider";
import type { baseUser } from "../repository/user/baseUser";
import { adminRole, serviceProviderRole, userRole } from "../utils/constantUtils";

class authServiceClass {
    constructor ( private userService : userGeneralMethodsClass, private serviceProviderService : serviceproviderGeneralMethodsClass ) {};

    login = async ( data : baseAuth ) => {
        if(data.role == userRole){
            const user = await this.userService.getByEmail(data.email);
            if(user.email){
                const pass = user.password;
                const flag = await bcrypt.compare( data.password, pass );

                if(flag){
                    logActivity.log(`User logged in with the id : ${user._id}`);
                    const token = authUtil.generateToken( user?._id?.toString() ?? "", userRole );
                    return token;
                }

                throw new serverError(400, "Incorrect credentials or email");
            }

            throw new serverError(400, "Incorrect credentials or email");
        }else if(data.role == serviceProviderRole){
            const serviceprovider = await this.serviceProviderService.getByEmail(data.email);
            if(serviceprovider.email){
                const pass = serviceprovider.password;
                const flag = await bcrypt.compare( data.password, pass );

                if(flag){
                    logActivity.log(`Service PRovider logged in with the id : ${serviceprovider._id}`);
                    const token = authUtil.generateToken( serviceprovider?._id?.toString() ?? "", serviceProviderRole);
                    return token;
                }

                throw new serverError(400, "Incorrect credentials or email");
            }

            throw new serverError(400, "Incorrect credentials or email");
        }else if(data.role == adminRole) {
            const admin = await this.userService.getByEmail(data.email);
            if(admin.email){
                const pass = admin.password;
                const flag = await bcrypt.compare(data.password, pass);

                if(flag){
                    logActivity.log(`Admin logged in with the id : ${admin._id}`);
                    const token = authUtil.generateToken(admin._id?.toString() ?? "", adminRole)
                    return token;
                }

                throw new serverError(400, "Incorrect credentials or email");
            }
        }
    }

    validate = async ( id : string, role : string ) => {
        if(role == userRole){
            const user = await this.userService.get(id);
            if(user.email){
                return;
            }

            throw new serverError(400, "Please Validate Yourself");
        }else if(role == serviceProviderRole){
            const serviceprovider = await this.serviceProviderService.get(id);
            if(serviceprovider.email){
                return;
            }
            throw new serverError(400, "Please Validate Yourself");
        }else if(role == adminRole){
            const admin = await this.userService.get(id);
            if(admin.email){
                return;
            }
            throw new serverError(400, "Please validate yourself");
        }
    }

    forget = async (mail : string, role : string) => {
        let person : any;
        if(role == userRole){
            person = await this.userService.getByEmail(mail);
        }else if(role == serviceProviderRole){
            person = await this.serviceProviderService.getByEmail(mail);
        }else if(role == adminRole){
            person = await this.userService.getByEmail(mail);
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
        if(role == userRole){
            person = await this.userService.getByEmail(mail);
            if(!person._id) throw new serverError(400, "No user or service provider found with the email");
            const data = <baseUser>{}
            person = await this.userService.update({
                ...data,
                email : mail,
                password : hashedPass,
                passFlag : true
            })

        }else if(role == serviceProviderRole){
            person = await this.serviceProviderService.getByEmail(mail);
            if(!person._id) throw new serverError(400, "No user or service provider found with the email");
            const data = <baseServiceProvider>{}
            person = await this.serviceProviderService.update({
                ...data,
                email : mail,
                password : hashedPass,
                passFlag : true
            });
        }else if(role == adminRole){
            person = await this.userService.getByEmail(mail);
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

