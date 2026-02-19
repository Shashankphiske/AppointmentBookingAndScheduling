import type { reportServiceClass } from "../service/reportServiceClass";
import type { Request, Response } from "express";

class reportControllerClass {
    constructor ( private reportServices : reportServiceClass ) {}

    generateReport = async (req : Request, res : Response) => {
        const data = await this.reportServices.generateReport();
        return res.send(data);
    }
}

export { reportControllerClass }