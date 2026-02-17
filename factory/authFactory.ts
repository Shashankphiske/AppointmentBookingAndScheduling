import { authControllerClass } from "../controller/authControllerClass.js";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo.js";
import { userMongoRepoClass } from "../repository/user/userMongoRepo.js";
import { authServiceClass } from "../service/authServiceClass.js";
import { authUtilClass } from "../utils/authUtil.js";



const authUtil = new authUtilClass();
const userMongoRepo = new userMongoRepoClass();
const serviceProviderMongoRepo = new serviceProviderMongoRepoClass();
const authServices = new authServiceClass(userMongoRepo, serviceProviderMongoRepo);
const authController = new authControllerClass(authServices);

export { authUtil, authServices, authController };