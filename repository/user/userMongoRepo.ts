import { User } from "../../models/userModel.js";
import type { baseUser } from "./baseUser.js";
import { userGeneralMethodsClass } from "./userGeneralMethods.js";

class userMongoRepoClass extends userGeneralMethodsClass {
    async create (data : baseUser) : Promise<baseUser> {
        const user = new User(data);
        await user.save();
        return user;
    }

    async get (id : string) : Promise <baseUser> {
        const user = await User.findById(id);

        return user ?? <baseUser> {};
    }

    async getAll () : Promise <baseUser[]> {
        const users = await User.find();
        return users;
    }

    async delete (id : string) : Promise<baseUser> {
        const user = await User.findByIdAndDelete(id);
        return user ?? <baseUser>{};
    }
}

export { userMongoRepoClass }