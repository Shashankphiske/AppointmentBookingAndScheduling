import { appointmentControllerClass } from "../controller/appointmentControllerClass.js";
import { appointmentMongoRepoClass } from "../repository/appointment/appointmentMongoRepo.js";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo.js";
import { userMongoRepoClass } from "../repository/user/userMongoRepo.js";
import { appointmentServiceClass } from "../service/appointmentServiceClass.js";

const appointmentMongoRepo = new appointmentMongoRepoClass();
const userMongoRepo = new userMongoRepoClass();
const serviceProviderMongoRepo = new serviceProviderMongoRepoClass()
const appointmentServices = new appointmentServiceClass(appointmentMongoRepo, userMongoRepo, serviceProviderMongoRepo);
const appointmentController = new appointmentControllerClass(appointmentServices);

export { appointmentController };