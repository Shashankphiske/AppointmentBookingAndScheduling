import type { ObjectId } from "mongodb"
import mongoose from "mongoose";

interface servicesType {
    _id : ObjectId;
    name : string;
    price : number;
    description : string;
    duration : number;
}

interface mongoServiceModel extends servicesType, mongoose.Document{};

const serviceSchema = new mongoose.Schema<mongoServiceModel>({
    name : { type : String, required : true },
    price : { type : Number, required : true },
    description : { type : String, default : "NA" },
    duration : { type : Number, required : true }
});

const Service = mongoose.model("Services", serviceSchema);

export { Service }