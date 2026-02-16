import { appointmentControllerClass } from "../controller/appointmentControllerClass.js";
import { appointmentMongoRepoClass } from "../repository/appointment/appointmentMongoRepo.js";
import { appointmentServiceClass } from "../service/appointmentServiceClass.js";

const appointmentMongoRepo = new appointmentMongoRepoClass();
const appointmentServices = new appointmentServiceClass(appointmentMongoRepo);
const appointmentController = new appointmentControllerClass(appointmentServices);

export { appointmentController };