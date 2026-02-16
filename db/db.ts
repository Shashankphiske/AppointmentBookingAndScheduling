import mongoose from "mongoose";

const connectDb = () => {
    if(!process.env.mongoDBConnection){
        console.log("please provide a mongodb connection");
    }

    try{
        mongoose.connect(process.env.mongoDBConnection ?? "");

        mongoose.connection.on("connected", () => {
            console.log("MongoDB Connected");
        });
    }catch (err) {
        console.log(`Error while connecting to mongo DB : ${err}`);
    }
} 

export { connectDb }