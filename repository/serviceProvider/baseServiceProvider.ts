import type { ObjectId } from "mongodb";

interface baseServiceProvider {
    _id ? : ObjectId;
    name : string;
    email : string;
}

export type { baseServiceProvider };