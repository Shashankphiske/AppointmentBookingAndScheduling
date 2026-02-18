import { authControllerClass } from "../controller/authControllerClass";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo";
import { userMongoRepoClass } from "../repository/user/userMongoRepo";
import { authServiceClass } from "../service/authServiceClass";
import { authUtilClass } from "../utils/authUtil";



const authUtil = new authUtilClass();
const userMongoRepo = new userMongoRepoClass();
const serviceProviderMongoRepo = new serviceProviderMongoRepoClass();
const authServices = new authServiceClass(userMongoRepo, serviceProviderMongoRepo);
const authController = new authControllerClass(authServices);

export { authUtil, authServices, authController };