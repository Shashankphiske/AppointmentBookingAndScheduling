import { Appointment } from "../../models/appointmentModel.js";
import { appointmentGeneralMethodsClass } from "./appointmentGeneralMethods.js";
import type { baseAppointment } from "./baseAppointment.js";

class appointmentMongoRepoClass extends appointmentGeneralMethodsClass {
    
    async create (data: baseAppointment): Promise<baseAppointment> {
        const appointment = new Appointment({
            ...data,
            date : new Date().toISOString().split("T")[0],
            time : new Date().toISOString().split("T")[1]?.split(".")[0],
            status : "OPEN"
        });

        await appointment.save();

        return appointment;
    }

    async get (id : string) : Promise<baseAppointment> {
        const appointment = await Appointment.findById(id);

        return appointment ?? <baseAppointment> {};
    }

    async getAll () : Promise <baseAppointment[]> {
        const appointments = await Appointment.find();

        return appointments;
    }

    async update (data : baseAppointment) : Promise<baseAppointment> {
        const appointment = await Appointment.findById(data._id);
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
}

export { appointmentMongoRepoClass };