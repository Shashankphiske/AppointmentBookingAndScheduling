import type { baseUser } from "./baseUser.js";

abstract class userGeneralMethodsClass {
    abstract create (data : baseUser) : Promise <baseUser>;
    abstract get (id : string) : Promise<baseUser>;
    abstract getAll () : Promise<baseUser[]>;
    abstract delete (id : string) : Promise<baseUser>;
    abstract getByEmail (email : string) : Promise<baseUser>;
    abstract update (data : baseUser) : Promise<baseUser>;
}

export { userGeneralMethodsClass };