import { User } from "../../models/userModel";
import type { baseUser } from "./baseUser";
import { userGeneralMethodsClass } from "./userGeneralMethods";

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

    async getByEmail(email: string): Promise<baseUser> {
         const user = await User.findOne({ email : email });
         return user ?? <baseUser>{};
    }

    async update (data : baseUser) : Promise<baseUser> {
        const user = await User.findOne({ email : data.email });
        if(!user?._id) return <baseUser>{};
        if(data.passFlag){
            user.password = data.password || user?.password;
        }else{
            user.name = data.name || user.name;
            user.phonenumber = data.phonenumber || user.phonenumber;
        }

        await user.save();
        return user;
    }
}

export { userMongoRepoClass }