import { authUtil } from "../factory/authFactory.js";
import { email, logActivity } from "../factory/utilFactory.js";
import type { baseServiceProvider } from "../repository/serviceProvider/baseServiceProvider.js";
import type { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods.js";
import { serverError } from "../utils/errorUtil.js";

class serviceProviderServiceClass {
    constructor (private serviceProviderMethods : serviceproviderGeneralMethodsClass) {};

    createServiceProvider = async (data : baseServiceProvider) => {
        const existing = await this.serviceProviderMethods.getByEmail(data.email);
        if(!existing.email){
            const hashedPass = await authUtil.hashPass(data.password);

            const serviceProvider = await this.serviceProviderMethods.create({...data,
                password : hashedPass
            });
            
            if(serviceProvider){
                const token = authUtil.generateToken(serviceProvider._id?.toString() ?? "", "serviceProvider");
                email.send(serviceProvider.email, "Welcome !");
                logActivity.log("New Service Provider Created");
                return { serviceProvider, token};
            }

            throw new serverError(500, "Error while creating a service provider");
        }
        throw new serverError(400, "Service Provider with the specified email already exists");
    }

    getServiceProvider = async (id : string) => {
        const serviceProvider = await this.serviceProviderMethods.get(id);
        if(serviceProvider){
            logActivity.log("Service Provider Fetched");
            return serviceProvider;
        }

        throw new serverError(400, `No service provider found with the id : ${id}`);
    }

    getAllServiceProviders = async () => {
        const serviceProviders = await this.serviceProviderMethods.getAll();
        if(serviceProviders.length > 0){
            logActivity.log("All Service Providers Fetched");
            return serviceProviders;
        }

        throw new serverError(400, "No service providers found");
    }

    deleteServiceProvider = async (id : string) => {
        const serviceProvider = await this.serviceProviderMethods.delete(id);
        if(serviceProvider){
            email.send(serviceProvider.email, "Your account has been deleted");
            logActivity.log("Service Provider Deleted");
            return serviceProvider;
        }

        throw new serverError(400, `No service provider found with the id : ${id}`);
    }
}

export { serviceProviderServiceClass };