import type { ObjectId } from "mongodb";

interface baseAppointment {
    _id ? : ObjectId;
    name : string;
    status : string;
    date : string;
    time : string;
    serviceProviderEmail : string;
    userEmail : string;
}

export type { baseAppointment };