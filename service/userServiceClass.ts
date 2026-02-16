import { authUtil } from "../factory/authFactory.js";
import { email, logActivity } from "../factory/utilFactory.js";
import type { baseUser } from "../repository/user/baseUser.js";
import { userGeneralMethodsClass } from "../repository/user/userGeneralMethods.js";
import { serverError } from "../utils/errorUtil.js";

class userServiceClass {
    constructor (private userMethods : userGeneralMethodsClass) {}
    createUser = async (data : baseUser) => {

        const existing = await this.userMethods.getByEmail(data.email);
        if(existing){
            throw new serverError(400, "User with the specified email already exists");
        }

        const hashedPass = await authUtil.hashPass(data.password);

        const user = await this.userMethods.create(data);
        
        if(user){
            const token = authUtil.generateToken(user._id?.toString() ?? "");
            email.send(user.email, "Welcome !");
            logActivity.log("New User Created");
            return { user, token};
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