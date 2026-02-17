import type { userServiceClass } from "../service/userServiceClass.js";
import type { Request, Response } from "express";

class userControllerClass {
    constructor ( private userServices : userServiceClass ) {};

    createUser = async (req : Request, res : Response) => {
        const data = await this.userServices.createUser(req.body);
        res.cookie("token", data.token, {maxAge : 604800, sameSite : true, httpOnly : true});
        return res.send(data.user);
    }

    getUser = async (req : Request, res : Response) => {
        const user = await this.userServices.getUser(req.body.id);
        return res.send(user);
    }

    getAllUsers = async (req : Request, res : Response) => {
        const users = await this.userServices.getAllUsers();
        return res.send(users);
    }

    deleteUser = async (req : Request, res : Response) => {
        const user = await this.userServices.deleteUser(req.body.id);
        res.clearCookie("token");
        return res.send(user);
    }
}

export { userControllerClass }