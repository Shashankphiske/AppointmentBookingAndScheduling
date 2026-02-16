import { serviceProviderControllerClass } from "../controller/serviceProviderControllerClass.js";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo.js";
import { serviceProviderServiceClass } from "../service/serviceProviderServiceClass.js";

const serviceProviderMongoRepo = new serviceProviderMongoRepoClass();
const serviceProviderServices = new serviceProviderServiceClass(serviceProviderMongoRepo);
const serviceProviderController = new serviceProviderControllerClass(serviceProviderServices);

export { serviceProviderController };