import type { ObjectId } from "mongodb";

interface baseUser {
    _id ? : ObjectId;
    name : string;
    email : string;
}

export type { baseUser };