import { appointmentControllerClass } from "../controller/appointmentControllerClass";
import { appointmentMongoRepoClass } from "../repository/appointment/appointmentMongoRepo";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo";
import { userMongoRepoClass } from "../repository/user/userMongoRepo";
import { appointmentServiceClass } from "../service/appointmentServiceClass";

const appointmentMongoRepo = new appointmentMongoRepoClass();
const userMongoRepo = new userMongoRepoClass();
const serviceProviderMongoRepo = new serviceProviderMongoRepoClass()
const appointmentServices = new appointmentServiceClass(appointmentMongoRepo, userMongoRepo, serviceProviderMongoRepo);
const appointmentController = new appointmentControllerClass(appointmentServices);

export { appointmentController };