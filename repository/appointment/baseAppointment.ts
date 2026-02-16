import type { ObjectId } from "mongodb";

interface baseAppointment {
    _id ? : ObjectId;
    name : string;
    status : boolean;
    createdAt : Date;
    serviceProviderEmail : string;
    userEmail : string;
}

export type { baseAppointment };