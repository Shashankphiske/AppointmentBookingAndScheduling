import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface baseAvailability {
    workingDays : string[],
    startTime : string,
    endTime : string,
    duration : number
}

interface serviceProviderType {
    _id : ObjectId
    name : string,
    password : string,
    email : string,
    phonenumber : number,
    role : string,
    serviceName : string,
    price : number,
    description : string,
    duration : number,
    availability : baseAvailability
}

interface mongoServiceProvider extends serviceProviderType, mongoose.Document{};

const serviceProviderModel = new mongoose.Schema<mongoServiceProvider>({
    name : {type : String, default : "NA"},
    password : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    phonenumber : { type : Number, default : 0 },
    role : { type : String, default : "serviceProvider" },
    serviceName : { type : String, required : true },
    price : { type : Number, default : 0 },
    duration : { type : Number, default : 0 },
    description : { type : String, default : "NA" },
    availability : { workingDays : { Array, default : [] }, startTime : {String, default : "00:00am"}, endTime : {String, default : "00:00pm"}, slotDuration : {Number, default : 0} }
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderModel);

export { ServiceProvider }