import { userControllerClass } from "../controller/userControllerClass.js";
import { userMongoRepoClass } from "../repository/user/userMongoRepo.js";
import { userServiceClass } from "../service/userServiceClass.js";

const userMongoRepo = new userMongoRepoClass();
const userServices = new userServiceClass(userMongoRepo);
const userController = new userControllerClass(userServices);

export { userController };