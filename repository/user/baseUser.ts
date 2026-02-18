import type { ObjectId } from "mongodb";

interface baseUser {
    _id ? : ObjectId;
    name : string;
    email : string;
    phonenumber : number;
    password : string;
    role : string;
    passFlag? : boolean
}

export type { baseUser };