import type { userServiceClass } from "../service/userServiceClass.js";
import type { Request, Response } from "express";
import { serverError } from "../utils/errorUtil.js";

class userControllerClass {
    constructor ( private userServices : userServiceClass ) {};

    createUser = async (req : Request, res : Response) => {
        if(req.body.email && req.body.password){
            const user = await this.userServices.createUser(req.body);
            return res.send(user);
        }

        throw new serverError(400, "Please provide necessary email and password");
    }

    getUser = async (req : Request, res : Response) => {
        if(req.body.id){
            const user = await this.userServices.getUser(req.body.id);
            return res.send(user);
        }

        throw new serverError(400, "Please provide an user id");
    }

    getAllUsers = async (req : Request, res : Response) => {
        const users = await this.userServices.getAllUsers();
        return res.send(users);
    }

    deleteUser = async (req : Request, res : Response) => {
        if(req.body.id){
            const user = await this.userServices.deleteUser(req.body.id);
            return res.send(user);
        }

        throw new serverError(400, "Please provide an user id");
    }
}

export { userControllerClass }