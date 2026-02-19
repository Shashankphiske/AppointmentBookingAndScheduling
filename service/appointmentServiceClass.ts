import { email, lockManager, logActivity } from "../factory/utilFactory";
import type { appointmentGeneralMethodsClass } from "../repository/appointment/appointmentGeneralMethods";
import type { baseAppointment } from "../repository/appointment/baseAppointment";
import { serverError } from "../utils/errorUtil";
import { userGeneralMethodsClass } from "../repository/user/userGeneralMethods";
import { serviceproviderGeneralMethodsClass } from "../repository/serviceProvider/serviceProviderGeneralMethods";
import { adminRole, serviceProviderRole, userRole } from "../utils/constantUtils";


class appointmentServiceClass {
    constructor (private appointmentMethods : appointmentGeneralMethodsClass, private userMethods : userGeneralMethodsClass, private servicePMethods : serviceproviderGeneralMethodsClass ) {};

    createAppointment = async (data : baseAppointment) => {

        const lockkey = `${data.serviceProviderEmail}:${data.date}`;
        const release = await lockManager.acquire(lockkey);
        try{

            await this.checkBooked(data); // checking if appointment already exists

            await this.checkExistence(data); // checking if user and service provide exist

            const price = await this.checkServiceProviderAvailability(data); // checking if service provider is available or not
            const appointment = await this.appointmentMethods.create({
                ...data,
                price
            });

            if(appointment){
                email.sendAppointment(appointment.serviceProviderEmail, appointment.userEmail, appointment._id?.toString() ?? "NA");
                logActivity.log("New Appointment Created");

                return appointment;
            }

            throw new serverError(500, "Error while creating an appointment");
        }finally {
            release();
        }
    }

    getAppointment = async (id : string, uid : string, role : string) => {
        const appointment = await this.appointmentMethods.get(id);
        if(!appointment._id) throw new serverError(400, "No appointment found");
        let person;
        if(role == serviceProviderRole){
            person = await this.servicePMethods.get(uid);
            if(appointment.serviceProviderEmail != person.email) throw new serverError(400, "No appointment found");
        }else if(role == userRole){
            person = await this.userMethods.get(uid);
            if(appointment.userEmail != person.email) throw new serverError(400, "No appointment found");
        }
        logActivity.log("Appointment fetched");
        return appointment;
    }

    getAllAppointments = async (uid : string, role : string) => {
        const appointments = await this.appointmentMethods.getAll();
        if(appointments.length == 0) throw new serverError(400, "No appointments found");
        if(role == adminRole){
            logActivity.log("All appointments fetched");
            return appointments;
        }
        let filteredAppointments = <baseAppointment[]>[];
        if(role == userRole){
            const user = await this.userMethods.get(uid);
            filteredAppointments = appointments.filter((a) => a.userEmail == user.email);
        }else if(role == serviceProviderRole){
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

    checkBooked = async (data : baseAppointment) => {
        const appointment = await this.appointmentMethods.getBooked(data.userEmail, data.serviceProviderEmail, data.date, data.time);
        if(appointment._id) throw new serverError(400, "Appointment already exists");

        return;
    }

    checkServiceProviderAvailability = async (data : baseAppointment) => {
        const serviceP = await this.servicePMethods.getByEmail(data.serviceProviderEmail);
        if(!serviceP._id) throw new serverError(400, "Service Provider not found");

        const day = new Date(data.date).toLocaleString("en-US", { weekday : "long" });

        if(!serviceP.availability?.workingDays.includes(day)) throw new serverError(400, "Service provider not available");

        if(data.time < serviceP.availability.startTime || data.time > serviceP.availability.endTime) throw new serverError(400, "Service Provider not available");

        let differenceTime = data.time - serviceP.availability.startTime;
        differenceTime = differenceTime/(1000*60);
        if(differenceTime % serviceP.availability.duration !== 0) throw new serverError(400, "Service Provider not available");

        return  (differenceTime / serviceP.availability.duration) * serviceP.price;
    }
}

export { appointmentServiceClass };