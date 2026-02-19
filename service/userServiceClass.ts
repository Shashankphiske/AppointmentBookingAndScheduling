import { authUtil } from "../factory/authFactory";
import { email, lockManager, logActivity } from "../factory/utilFactory";
import type { baseUser } from "../repository/user/baseUser";
import { userGeneralMethodsClass } from "../repository/user/userGeneralMethods";
import { userRole } from "../utils/constantUtils";
import { serverError } from "../utils/errorUtil";

class userServiceClass {
    constructor (private userMethods : userGeneralMethodsClass) {}
    createUser = async (data : baseUser) => {

        const lockkey = `${data.email}`;
        const release = await lockManager.acquire(lockkey);

        try{
            const existing = await this.userMethods.getByEmail(data.email);
            if(existing.email){
                throw new serverError(400, "User with the specified email already exists");
            }

            const hashedPass = await authUtil.hashPass(data.password);

            const user = await this.userMethods.create({
                ...data,
                password : hashedPass,
            });
            
            if(user){
                const token = authUtil.generateToken(user._id?.toString() ?? "", userRole);
                email.send(user.email, "Welcome !");
                logActivity.log("New User Created");
                return { user, token};
            }

            throw new serverError(500, "Error while creating a user");
        }finally{
            release();
        }
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

    deleteUser = async (did : string, token : string) => {

        const { id, role } = authUtil.decodeToken(token);
        if(id != did) throw new serverError(400, "Not Authorized");

        const user = await this.userMethods.delete(did);
    
        if(user){
            email.send(user.email, "Your account has been deleted");
            logActivity.log("User Deleted");
            return user;
        }

        throw new serverError(400, `No user found with the id : ${id}`);
    }

    getByEmail = async (email : string) => {
        const user = await this.userMethods.getByEmail(email);
        if(user.email){
            logActivity.log("User fetched using email");
            return user;
        }

        throw new serverError(400, "User with specified email does not exist");
    }
}

export { userServiceClass };