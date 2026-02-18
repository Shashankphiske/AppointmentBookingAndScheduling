import { authUtil } from "../factory/authFactory.js";
import type { appointmentServiceClass } from "../service/appointmentServiceClass.js";
import type { NextFunction, Request, Response } from "express";

class appointmentControllerClass {
    constructor (private appointmentServices : appointmentServiceClass) {};

    createAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.createAppointment(req.body);
        return res.send(appointment);
    }

    getAppointment = async (req : Request, res : Response) => {
        const { id, role } = authUtil.decodeToken(req.cookies.token);
        const appointment = await this.appointmentServices.getAppointment(req.body.id, id, role);
        return res.send(appointment);
    }

    getAllAppointments = async (req : Request, res : Response) => {
        const { id, role } = authUtil.decodeToken(req.cookies.token);
        const appointments = await this.appointmentServices.getAllAppointments(id, role);
        return res.send(appointments);
    }

    updateAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.updateAppointment(req.body);
        return res.send(appointment);
    }

    deleteAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.deleteAppointment(req.body.id);
        return res.send(appointment);
    }

    checkExistence = async (req : Request, res : Response, next : NextFunction) => {
        if(req.method == "GET" || req.method == "DELETE"){
            return next();
        }
        await this.appointmentServices.checkExistence(req.body);
    }
}

export { appointmentControllerClass }