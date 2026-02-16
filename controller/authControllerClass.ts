import express from "express"
import { authUtil } from "../factory/authFactory.js";

const authRouter = express();

authRouter.post("/login", );
authRouter.get("/logout", authUtil.logout);

export { authRouter };