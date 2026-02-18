import mongoose from "mongoose";
import type { ObjectId } from "mongodb";

interface UserType{
  _id : ObjectId
  name : string;
  email : string;
  phonenumber : number;
  password : string;
  role : string;
}

interface mongoUserModel extends UserType, mongoose.Document{};

const userSchema = new mongoose.Schema<mongoUserModel>({
    name : { type : String, default : null },
    email : { type : String, unique : true, required : true },
    phonenumber : { type : Number, default : 0 },
    password : { type : String, unique : true, required : true },
    role : { type : String, default : "user" }
});

const User = mongoose.model("User", userSchema);

export { User };