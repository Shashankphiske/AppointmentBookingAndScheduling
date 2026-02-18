import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface appointmentType {
    _id : ObjectId
    name : string;
    status : string;
    date : string;  
    time : string; 
    serviceProviderEmail : string;
    userEmail : string;
}

interface mongoAppointmentModel extends appointmentType, mongoose.Document{};

const appointmentModel = new mongoose.Schema<mongoAppointmentModel>({
    name : { type : String, default : "NA" },
    status : { type : String, enum : ["scheduled", "cancelled", "completed"], default : "scheduled" },
    date : { type : String, required : true },
    time : { type : String, required : true },
    serviceProviderEmail : { type : String, required : true },
    userEmail : { type : String, required : true }
});

const Appointment = mongoose.model("Appointment", appointmentModel);

export { Appointment };