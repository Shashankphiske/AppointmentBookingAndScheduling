import type { serviceProviderServiceClass } from "../service/serviceProviderServiceClass.js";
import type { Request, Response } from "express";
import { serverError } from "../utils/errorUtil.js";

class serviceProviderControllerClass {
    constructor (private serviceProviderServices : serviceProviderServiceClass) {};

    createServiceProvider = async (req : Request, res : Response) => {
        if(req.body.email && req.body.password){
            const serviceprovider = await this.serviceProviderServices.createServiceProvider(req.body);
            return res.send(serviceprovider);
        }

        throw new serverError(400, "Please provide email and password");
    }

    getServiceProvider = async (req : Request, res : Response) => {
        if(req.body.id){
            const serviceprovider = await this.serviceProviderServices.getServiceProvider(req.body.id);
            return res.send(serviceprovider);
        }

        throw new serverError(400, "Please provide an id");
    }

    getAllServiceProvider = async (req : Request, res : Response) => {
        const serviceprovider = await this.serviceProviderServices.getAllServiceProviders();
        return res.send(serviceprovider);
    }

    deleteServiceProvider = async (req : Request, res : Response) => {
        if(req.body.id){
            const serviceprovider = await this.serviceProviderServices.deleteServiceProvider(req.body.id);
            return res.send(serviceprovider);
        }

        throw new serverError(400, "Please provide an id");
    }
}

export { serviceProviderControllerClass };