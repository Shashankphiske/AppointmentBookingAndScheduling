import { authUtil } from "../factory/authFactory";
import { email, lockManager, logActivity } from "../factory/utilFactory";
import type { baseServiceProvider } from "../repository/serviceProvider/baseServiceProvider";
import type { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods";
import { serviceProviderRole } from "../utils/constantUtils";
import { serverError } from "../utils/errorUtil";

class serviceProviderServiceClass {
    constructor (private serviceProviderMethods : serviceproviderGeneralMethodsClass) {};

    createServiceProvider = async (data : baseServiceProvider) => {
        const lockkey = `${data.email}`
        const release = await lockManager.acquire(lockkey);

        try{
            const existing = await this.serviceProviderMethods.getByEmail(data.email);
            if(!existing.email){
                const hashedPass = await authUtil.hashPass(data.password);

                const serviceProvider = await this.serviceProviderMethods.create({...data,
                    password : hashedPass
                });
                
                if(serviceProvider){
                    const token = authUtil.generateToken(serviceProvider._id?.toString() ?? "", serviceProviderRole);
                    email.send(serviceProvider.email, "Welcome !");
                    logActivity.log("New Service Provider Created");
                    return { serviceProvider, token};
                }

                throw new serverError(500, "Error while creating a service provider");
            }
            throw new serverError(400, "Service Provider with the specified email already exists");
        }finally{
            release();
        }
    }

    getServiceProvider = async (id : string) => {
        const serviceProvider = await this.serviceProviderMethods.get(id);
        if(serviceProvider.email){
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
        if(serviceProvider.email){
            email.send(serviceProvider.email, "Your account has been deleted");
            logActivity.log("Service Provider Deleted");
            return serviceProvider;
        }

        throw new serverError(400, `No service provider found with the id : ${id}`);
    }

    getByEmail = async (email : string) => {
        const serviceProvider = await this.serviceProviderMethods.getByEmail(email);
        if(serviceProvider.email){
            logActivity.log("Service provider fetched using email");
            return serviceProvider;
        }

        throw new serverError(400, "Service provider with the specified email does not exist");
    }

    update = async (data : baseServiceProvider) => {

        const serviceP = await this.serviceProviderMethods.update(data);
        if(!serviceP._id) throw new serverError(400, "Service Provider not found");

        logActivity.log("data updated for service provider");

        return serviceP;

    }
}

export { serviceProviderServiceClass };