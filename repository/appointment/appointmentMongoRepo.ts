import { Appointment } from "../../models/appointmentModel.js";
import { appointmentGeneralMethodsClass } from "./appointmentGeneralMethods.js";
import type { baseAppointment } from "./baseAppointment.js";

class appointmentMongoRepoClass extends appointmentGeneralMethodsClass {
    
    async create (data: baseAppointment): Promise<baseAppointment> {
        const appointment = new Appointment({
            ...data,
            createdAt : new Date(),
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