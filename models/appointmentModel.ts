import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface appointmentType {
    _id : ObjectId;
    name : string;
    status : string;
    date : Date;  
    time : number; 
    serviceProviderEmail : string;
    userEmail : string;
    price : number
}

interface mongoAppointmentModel extends appointmentType, mongoose.Document{};

const appointmentModel = new mongoose.Schema<mongoAppointmentModel>({
    name : { type : String, default : "NA" },
    status : { type : String, enum : ["scheduled", "cancelled", "completed", "pending"], default : "pending" },
    date : { type : Date, required : true },
    time : { type : Number, required : true },
    serviceProviderEmail : { type : String, required : true },
    userEmail : { type : String, required : true },
    price : { type : Number, default : 0 },
});

const Appointment = mongoose.model("Appointment", appointmentModel);

export { Appointment };