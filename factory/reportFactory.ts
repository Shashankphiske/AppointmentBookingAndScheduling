import { reportControllerClass } from "../controller/reportControllerClass";
import { appointmentMongoRepoClass } from "../repository/appointment/appointmentMongoRepo";
import { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo";
import { userMongoRepoClass } from "../repository/user/userMongoRepo";
import { reportServiceClass } from "../service/reportServiceClass";

const userMongoRepo = new userMongoRepoClass();
const serviceProviderMongoRepo = new serviceProviderMongoRepoClass();
const appointmentMongoRepo = new appointmentMongoRepoClass();

const reportServices = new reportServiceClass(userMongoRepo, serviceProviderMongoRepo, appointmentMongoRepo)
const reportController = new reportControllerClass(reportServices);

export { reportController };