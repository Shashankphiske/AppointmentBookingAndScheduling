import type { paymentServiceClass } from "../service/paymentServiceClass";
import type { Request, Response } from "express";


class paymentControllerClass {
    constructor ( private paymentServices :  paymentServiceClass) {}

    generatePaymentToken = async ( req : Request, res : Response ) => {
        const token = await this.paymentServices.generatePaymentToken(req.body.id, req.body.flag);
        return res.send(token);
        
    }

    confirmPayment = async (req :Request, res : Response) => {
        const result = await this.paymentServices.confirmPayment(req.body.token);
        return res.send(result);
    }
}

export { paymentControllerClass }