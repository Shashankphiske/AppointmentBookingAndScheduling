import mongoose from "mongoose";
import { authUtil } from "../factory/authFactory"
import { logActivity } from "../factory/utilFactory";
import type { appointmentGeneralMethodsClass } from "../repository/appointment/appointmentGeneralMethods";
import { serverError } from "../utils/errorUtil";
import type { baseAppointment } from "../repository/appointment/baseAppointment";
import { email } from "../factory/utilFactory";

class paymentServiceClass {

    constructor (private appointmentMethods : appointmentGeneralMethodsClass) {}

    confirmPayment = async (token : string) => {
        const { id, flag } = authUtil.decodePaymentToken(token);
        let appointment;
        if(!flag) {
            appointment = await this.appointmentMethods.delete(id);
            if(!appointment._id) throw new serverError(400, "Appointment does not exist");

            logActivity.log("Payment cancelled and appointment deleted");
            return "Payment failed appointment deleted";
        }
        const nid = new mongoose.Types.ObjectId(id);
        const data = <baseAppointment>{};
        appointment = await this.appointmentMethods.update({
            ...data,
            _id : nid,
            status : "scheduled"
        });
        email.sendAppointment(appointment.serviceProviderEmail, appointment.userEmail, appointment._id?.toString() ?? "NA");
        logActivity.log("Payment confirmed and appointment generated")
        return appointment;
    }

    generatePaymentToken = async (id : string, flag : boolean) => {
        const token = authUtil.generatePaymentToken(id, flag)
        logActivity.log("Payment token generated");
        return token;
    }
}

export { paymentServiceClass }