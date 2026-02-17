import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface serviceProviderType {
    _id : ObjectId
    name : string,
    password : string,
    email : string,
    role : string,
    serviceName : string,
    price : number,
    description : string,
    duration : number
}

interface mongoServiceProvider extends serviceProviderType, mongoose.Document{};

const serviceProviderModel = new mongoose.Schema<mongoServiceProvider>({
    name : {type : String},
    password : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    role : { type : String, default : "serviceProvider" },
    serviceName : { type : String, required : true },
    price : { type : Number },
    duration : { type : Number },
    description : { type : String }
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderModel);

export { ServiceProvider }