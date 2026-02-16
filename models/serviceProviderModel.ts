import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface serviceProviderType {
    _id : ObjectId
    name : string,
    password : string,
    email : string
}

interface mongoServiceProvider extends serviceProviderType, mongoose.Document{};

const serviceProviderModel = new mongoose.Schema<mongoServiceProvider>({
    name : {type : String},
    password : { type : String },
    email : { type : String }
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderModel);

export { ServiceProvider }