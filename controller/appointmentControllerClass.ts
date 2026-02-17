import type { appointmentServiceClass } from "../service/appointmentServiceClass.js";
import type { Request, Response } from "express";

class appointmentControllerClass {
    constructor (private appointmentServices : appointmentServiceClass) {};

    createAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.createAppointment(req.body);
        return res.send(appointment);
    }

    getAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.getAppointment(req.body.id);
        return res.send(appointment);
    }

    getAllAppointments = async (req : Request, res : Response) => {
        const appointments = await this.appointmentServices.getAllAppointments();
        return appointments;
    }

    updateAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.updateAppointment(req.body);
        return res.send(appointment);
    }

    deleteAppointment = async (req : Request, res : Response) => {
        const appointment = await this.appointmentServices.deleteAppointment(req.body.id);
        return res.send(appointment);
    }
}

export { appointmentControllerClass }