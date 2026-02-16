import type { baseAppointment } from "./baseAppointment.js";

abstract class appointmentGeneralMethodsClass {
    abstract create (data : baseAppointment) : Promise<baseAppointment>;
    abstract update (data : baseAppointment) : Promise<baseAppointment>;
    abstract get (id : string) : Promise<baseAppointment>;
    abstract getAll () : Promise <baseAppointment[]>;
    abstract delete (id : string) : Promise <baseAppointment>;
}

export { appointmentGeneralMethodsClass };