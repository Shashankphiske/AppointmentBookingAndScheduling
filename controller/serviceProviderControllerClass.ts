import type { serviceProviderServiceClass } from "../service/serviceProviderServiceClass.js";
import type { Request, Response } from "express";

class serviceProviderControllerClass {
    constructor (private serviceProviderServices : serviceProviderServiceClass) {};

    createServiceProvider = async (req : Request, res : Response) => {
        const data = await this.serviceProviderServices.createServiceProvider(req.body);
        res.cookie("token", data.token, {maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true})
        return res.send(data.serviceProvider);
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