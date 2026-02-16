import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface UserType{
  _id : ObjectId
  name : string;
  email : string;
  password : string;
}

interface mongoUserModel extends UserType, mongoose.Document{};

const userSchema = new mongoose.Schema<mongoUserModel>({
    name : { type : String, default : null },
    email : { type : String },
    password : { type : String }
});

const User = mongoose.model("User", userSchema);

export { User };