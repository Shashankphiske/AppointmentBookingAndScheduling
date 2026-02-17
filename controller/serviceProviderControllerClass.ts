import type { serviceProviderServiceClass } from "../service/serviceProviderServiceClass.js";
import type { Request, Response } from "express";

class serviceProviderControllerClass {
    constructor (private serviceProviderServices : serviceProviderServiceClass) {};

    createServiceProvider = async (req : Request, res : Response) => {
        const serviceprovider = await this.serviceProviderServices.createServiceProvider(req.body);
        return res.send(serviceprovider);
    }

    getServiceProvider = async (req : Request, res : Response) => {
        const serviceprovider = await this.serviceProviderServices.getServiceProvider(req.body.id);
        return res.send(serviceprovider);
    }

    getAllServiceProvider = async (req : Request, res : Response) => {
        const serviceprovider = await this.serviceProviderServices.getAllServiceProviders();
        return res.send(serviceprovider);
    }

    deleteServiceProvider = async (req : Request, res : Response) => {
        const serviceprovider = await this.serviceProviderServices.deleteServiceProvider(req.body.id);
        return res.send(serviceprovider);
    }
}

export { serviceProviderControllerClass };