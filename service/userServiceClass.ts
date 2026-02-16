import { email, logActivity } from "../factory/utilFactory.js";
import type { baseUser } from "../repository/user/baseUser.js";
import { userGeneralMethodsClass } from "../repository/user/userGeneralMethods.js";
import { serverError } from "../utils/errorUtil.js";

class userServiceClass {
    constructor (private userMethods : userGeneralMethodsClass) {}
    createUser = async (data : baseUser) => {
        const user = await this.userMethods.create(data);
        if(user){
            email.send(user.email, "Welcome !");
            logActivity.log("New User Created");
            return user;
        }

        throw new serverError(500, "Error while creating a user");
    }

    getUser = async (id : string) => {
        const user = await this.userMethods.get(id);
        if(user){
            logActivity.log("User Fetched");
            return user;
        }

        throw new serverError(400, `No user found with the id : ${id}`);
    }

    getAllUsers = async () => {
        const users = await this.userMethods.getAll();
        if(users.length > 0){
            logActivity.log("All Users Fetched");
            return users;
        }

        throw new serverError(400, "No users found");
    }

    deleteUser = async (id : string) => {
        const user = await this.userMethods.delete(id);
        if(user){
            email.send(user.email, "Your account has been deleted");
            logActivity.log("User Deleted");
            return user;
        }

        throw new serverError(400, `No user found with the id : ${id}`);
    }
    
}

export { userServiceClass };