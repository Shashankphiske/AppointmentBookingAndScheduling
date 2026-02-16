import type { appointmentServiceClass } from "../service/appointmentServiceClass.js";
import type { Request, Response } from "express";
import { serverError } from "../utils/errorUtil.js";

class appointmentControllerClass {
    constructor (private appointmentServices : appointmentServiceClass) {};

    createAppointment = async (req : Request, res : Response) => {
        if(req.body.name && req.body.serviceProviderEmail && req.body.userEmail){
            const appointment = await this.appointmentServices.createAppointment(req.body);
            return res.send(appointment);
        }

        throw new serverError(400, "Please provide name, service provider email and user email");
    }

    getAppointment = async (req : Request, res : Response) => {
        if(req.body.id){
            const appointment = await this.appointmentServices.getAppointment(req.body.id);
            return res.send(appointment);
        }

        throw new serverError(400, "Pleae provide an id");
    }

    getAllAppointments = async (req : Request, res : Response) => {
        const appointments = await this.appointmentServices.getAllAppointments();
        return appointments;
    }

    updateAppointment = async (req : Request, res : Response) => {
        if(req.body._id){
            const appointment = await this.appointmentServices.updateAppointment(req.body);
            return res.send(appointment);
        }

        throw new serverError(400, "Please provide an id");
    }

    deleteAppointment = async (req : Request, res : Response) => {
        if(req.body.id){
            const appointment = await this.appointmentServices.deleteAppointment(req.body.id);
            return res.send(appointment);
        }

        throw new serverError(400, "Please provide an id");
    }
}

export { appointmentControllerClass }