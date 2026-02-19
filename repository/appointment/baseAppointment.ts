import type { ObjectId } from "mongodb";

interface baseAppointment {
    _id ? : ObjectId;
    name : string;
    status : string;
    date : Date;
    time : number;
    serviceProviderEmail : string;
    userEmail : string;
    price : number;
}

export type { baseAppointment };