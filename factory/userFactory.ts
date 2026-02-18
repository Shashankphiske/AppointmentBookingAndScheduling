import { userControllerClass } from "../controller/userControllerClass";
import { userMongoRepoClass } from "../repository/user/userMongoRepo";
import { userServiceClass } from "../service/userServiceClass";

const userMongoRepo = new userMongoRepoClass();
const userServices = new userServiceClass(userMongoRepo);
const userController = new userControllerClass(userServices);

export { userController };