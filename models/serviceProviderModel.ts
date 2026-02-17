import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface serviceProviderType {
    _id : ObjectId
    name : string,
    password : string,
    email : string,
    role : string
}

interface mongoServiceProvider extends serviceProviderType, mongoose.Document{};

const serviceProviderModel = new mongoose.Schema<mongoServiceProvider>({
    name : {type : String},
    password : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    role : { type : String, default : "serviceProvider" }
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderModel);

export { ServiceProvider }