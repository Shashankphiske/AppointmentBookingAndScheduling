import type { ObjectId } from "mongodb";

interface baseService {
    _id? : ObjectId
    name : string;
    price : number;
    duration : number;
    description : string;
}

interface baseServiceProvider {
    _id ? : ObjectId;
    name : string;
    email : string;
    role : string;
    password : string;
    serviceName : string,
    duration : number,
    price : number,
    description : string
}

export type { baseServiceProvider, baseService };