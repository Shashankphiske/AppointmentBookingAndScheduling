import { email, logActivity } from "../factory/utilFactory";
import type { appointmentGeneralMethodsClass } from "../repository/appointment/appointmentGeneralMethods";
import type { baseAppointment } from "../repository/appointment/baseAppointment";
import { serverError } from "../utils/errorUtil";
import { userGeneralMethodsClass } from "../repository/user/userGeneralMethods";
import { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods";


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

    getAppointment = async (id : string, uid : string, role : string) => {
        const appointment = await this.appointmentMethods.get(id);
        if(!appointment._id) throw new serverError(400, "No appointment found");
        let person;
        if(role == "serviceProvider"){
            person = await this.servicePMethods.get(uid);
            if(appointment.serviceProviderEmail != person.email) throw new serverError(400, "No appointment found");
        }else if(role == "user"){
            person = await this.userMethods.get(uid);
            if(appointment.userEmail != person.email) throw new serverError(400, "No appointment found");
        }
        logActivity.log("Appointment fetched");
        return appointment;
    }

    getAllAppointments = async (uid : string, role : string) => {
        const appointments = await this.appointmentMethods.getAll();
        if(appointments.length == 0) throw new serverError(400, "No appointments found");
        if(role == "admin"){
            logActivity.log("All appointments fetched");
            return appointments;
        }
        let filteredAppointments = <baseAppointment[]>[];
        if(role == "user"){
            const user = await this.userMethods.get(uid);
            filteredAppointments = appointments.filter((a) => a.userEmail == user.email);
        }else if(role == "serviceProvider"){
            const serviceP = await this.servicePMethods.get(uid);
            filteredAppointments = appointments.filter((a) => a.serviceProviderEmail == serviceP.email);
        }

        if(filteredAppointments.length == 0) throw new serverError(400, "No appointments found");
        logActivity.log("All appointments fetched");
        return filteredAppointments;
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