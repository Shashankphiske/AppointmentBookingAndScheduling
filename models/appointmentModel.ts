import mongoose, { mongo } from "mongoose";
import type { ObjectId } from "mongodb";

interface appointmentType {
    _id : ObjectId
    name : string;
    status : boolean;
    createdAt : Date;   
    serviceProviderEmail : string;
    userEmail : string;
}

interface mongoAppointmentModel extends appointmentType, mongoose.Document{};

const appointmentModel = new mongoose.Schema<mongoAppointmentModel>({
    name : { type : String },
    status : { type : Boolean },
    createdAt : { type : Date },
    serviceProviderEmail : { type : String },
    userEmail : { type : String }
});

const Appointment = mongoose.model("Appointment", appointmentModel);

export { Appointment };