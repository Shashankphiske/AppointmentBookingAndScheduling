import mongoose from "mongoose";

interface baseAvailability {
    workingDays : string[],
    startTime : number,
    endTime : number,
    duration : number
}

interface serviceProviderType {
    name : string,
    password : string,
    email : string,
    phonenumber : number,
    role : string,
    serviceName : string,
    price : number,
    description : string,
    availability : baseAvailability,
    passFlag ? : boolean
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
    description : { type : String, default : "NA" },
    availability : { workingDays : { type: Array, default : [] }, startTime : {type : Number, default : 0}, endTime : {type : Number, default : 0}, duration : {type : Number, default : 0} }
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderModel);

export { ServiceProvider }
export type { serviceProviderType as baseServiceProvider }