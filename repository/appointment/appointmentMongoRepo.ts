import { Appointment } from "../../models/appointmentModel";
import { appointmentGeneralMethodsClass } from "./appointmentGeneralMethods";
import type { baseAppointment } from "../../models/appointmentModel";

class appointmentMongoRepoClass extends appointmentGeneralMethodsClass {
    
    async create (data: baseAppointment): Promise<baseAppointment> {
        const appointment = new Appointment({
            ...data,
            status : "pending"
        });

        await appointment.save();

        return appointment;
    }

    async get (id : string) : Promise<baseAppointment> {
        const appointment = await Appointment.findById({ _id : id });

        return appointment ?? <baseAppointment> {};
    }

    async getAll () : Promise <baseAppointment[]> {
        const appointments = await Appointment.find();

        return appointments;
    }

    async update (data : baseAppointment) : Promise<baseAppointment> {
        const appointment = await Appointment.findById(data.id);
        if ( appointment != null){
            appointment.status = data.status || appointment.status;
            appointment.date = data.date || appointment.date;
            appointment.time = data.time || appointment.time;
            appointment.serviceProviderEmail = data.serviceProviderEmail || appointment.serviceProviderEmail;
            appointment.userEmail = data.userEmail || appointment.userEmail;
            await appointment.save();
        }

        return appointment ?? <baseAppointment>{};
    }

    async delete (id : string) : Promise <baseAppointment> {
        const appointment = await Appointment.findByIdAndDelete(id);
        return appointment ?? <baseAppointment>{};
    }

    async getBooked(userEmail: string, serviceProviderEmail: string, date: Date, time: number): Promise<baseAppointment> {
        const appointment = await Appointment.findOne({ userEmail : userEmail,serviceProviderEmail : serviceProviderEmail, date : date, time: time });

        return appointment ?? <baseAppointment>{};
    }
}

export { appointmentMongoRepoClass };