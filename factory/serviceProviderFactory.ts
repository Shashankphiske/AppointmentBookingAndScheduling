import { serviceProviderControllerClass } from "../controller/serviceProviderControllerClass";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo";
import { serviceProviderServiceClass } from "../service/serviceProviderServiceClass";

const serviceProviderMongoRepo = new serviceProviderMongoRepoClass();
const serviceProviderServices = new serviceProviderServiceClass(serviceProviderMongoRepo);
const serviceProviderController = new serviceProviderControllerClass(serviceProviderServices);

export { serviceProviderController };