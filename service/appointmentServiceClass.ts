import { email, logActivity } from "../factory/utilFactory.js";
import type { appointmentGeneralMethodsClass } from "../repository/appointment/appointmentGeneralMethods.js";
import type { baseAppointment } from "../repository/appointment/baseAppointment.js";
import { serverError } from "../utils/errorUtil.js";
import { userGeneralMethodsClass } from "../repository/user/userGeneralMethods.js";
import { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods.js";


class appointmentServiceClass {
    constructor (private appointmentMethods : appointmentGeneralMethodsClass, private userMethods : userGeneralMethodsClass, private servicePMethods : serviceproviderGeneralMethodsClass ) {};

    createAppointment = async (data : baseAppointment) => {

        await this.checkExistence(data);

        const appointment = await this.appointmentMethods.create(data);

        if(appointment){
            email.sendAppointment(appointment.serviceProviderEmail, appointment.userEmail, appointment._id?.toString() ?? "NA");
            logActivity.log("New Appointment Created");

            return appointment;
        }

        throw new serverError(500, "Error while creating an appointment");
    }

    getAppointment = async (id : string) => {
        const appointment = await this.appointmentMethods.get(id);
        if(appointment){
            logActivity.log("Appointment Fetched");
            return appointment;
        }
        throw new serverError(400, `No Appointment found with the id : ${id}`);
    }

    getAllAppointments = async () => {
        const appointments = await this.appointmentMethods.getAll();
        if(appointments.length > 0){
            logActivity.log("All Appointments Fetched");
            return appointments;
        }

        throw new serverError(400, "No appointments found");
    }

    updateAppointment = async (data : baseAppointment) => {
        await this.checkExistence(data);
        const appointment = await this.appointmentMethods.update(data);
        if(appointment){
            logActivity.log("Appointment Updated");
            email.sendUpdatedAppointment(appointment.serviceProviderEmail, appointment.userEmail, appointment?._id?.toString() ?? "") 
            return appointment;
        }

        throw new serverError(400, `No appointment found with the id : ${data._id}`);
    }

    deleteAppointment = async (id : string) => {
        const appointment = await this.appointmentMethods.delete(id);
        if(appointment){
            logActivity.log("Appointment Deleted");
            email.sendDeletedAppointment(appointment.serviceProviderEmail, appointment.userEmail, appointment?._id?.toString() ?? "");
            return appointment;
        }
        throw new serverError(400, `No appointment found with the id : ${id} `);
    }

    checkExistence = async ( data : baseAppointment ) => {
        if(data.userEmail){
            const user = await this.userMethods.getByEmail(data.userEmail);
            if(!user.email) throw new serverError(400, "User does not exist");
        }
        if(data.serviceProviderEmail){
            const serviceP = await this.servicePMethods.getByEmail(data.serviceProviderEmail);
            if(!serviceP.email) throw new serverError(400, "Service Provider does not exist");
        }

        return;
    }
}

export { appointmentServiceClass };