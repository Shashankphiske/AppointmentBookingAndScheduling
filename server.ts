import helmet from "helmet"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import { connectDb } from "./db/db.js";
import { userRouter } from "./router/userRouter.js";
import { appointmentRouter } from "./router/appointmentRouter.js";
import { serviceProviderRouter } from "./router/serviceProviderRouter.js";
import { errorHandler, globalErrorHandler } from "./factory/utilFactory.js";
import { authRouter } from "./router/authRouter.js";
import { authController } from "./factory/authFactory.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
dotenv.config();

connectDb();

app.get("/", (req, res) => {
    console.log("Hello, World!");
    res.send("Hello");
} )

app.use(globalErrorHandler.validateBody);

app.use("/user", userRouter);
app.use("/appointment", appointmentRouter);
app.use("/serviceprovider", serviceProviderRouter);
app.use("/auth", authRouter);

app.use(globalErrorHandler.handleError);

app.listen(process.env.PORT, () => {
    console.log(`App is running in port ${process.env.PORT}`);
});