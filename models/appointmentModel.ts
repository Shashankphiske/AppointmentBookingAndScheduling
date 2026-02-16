import mongoose, { mongo } from "mongoose";
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
    name : { type : String },
    status : { type : String },
    date : { type : String },
    time : { type : String },
    serviceProviderEmail : { type : String },
    userEmail : { type : String }
});

const Appointment = mongoose.model("Appointment", appointmentModel);

export { Appointment };