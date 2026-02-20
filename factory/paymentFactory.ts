import { paymentControllerClass } from "../controller/paymentControllerClass";
import { appointmentMongoRepoClass } from "../repository/appointment/appointmentMongoRepo";
import { paymentServiceClass } from "../service/paymentServiceClass";


const appointmentMethods = new appointmentMongoRepoClass();
const paymentService = new paymentServiceClass(appointmentMethods);
const paymentController = new paymentControllerClass(paymentService);

export { paymentController }
