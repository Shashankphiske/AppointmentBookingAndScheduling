import type { ObjectId } from "mongodb";

interface baseUser {
    _id ? : ObjectId;
    name : string;
    email : string;
    password : string;
    role : string;
}

export type { baseUser };