import type { baseAppointment } from "../../models/appointmentModel";

abstract class appointmentGeneralMethodsClass {
    abstract create (data : baseAppointment) : Promise<baseAppointment>;
    abstract update (data : baseAppointment) : Promise<baseAppointment>;
    abstract get (id : string) : Promise<baseAppointment>;
    abstract getAll () : Promise <baseAppointment[]>;
    abstract delete (id : string) : Promise <baseAppointment>;
    abstract getBooked (userEmail : string, serviceProviderEmail : string, date : Date, time : number) : Promise<baseAppointment>;
}

export { appointmentGeneralMethodsClass };