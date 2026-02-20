import type { appointmentMongoRepoClass } from "../repository/appointment/appointmentMongoRepo";
import type { serviceProviderMongoRepoClass } from "../repository/serviceProvider/serviceProviderMongoRepo";
import type { userMongoRepoClass } from "../repository/user/userMongoRepo";

class reportServiceClass {
    constructor ( private userMethods : userMongoRepoClass, private serviceProviderMethods : serviceProviderMongoRepoClass, private appointmentMethods : appointmentMongoRepoClass ) {}

    generateReport = async () => {
        const users = await this.userMethods.getAll();
        const serviceProviders = await this.serviceProviderMethods.getAll();
        const appointments = await this.appointmentMethods.getAll();

        const scheduledAppointments = appointments.filter((a) => a.status == "scheduled");
        const cancelledAppointments = appointments.filter((a) => a.status == "cancelled");
        const completedAppointments = appointments.filter((a) => a.status == "completed");
        const pendingAppointments = appointments.filter((a) => a.status == "pending");

        return {
            users : users.length,
            serviceProviders : serviceProviders.length,
            appointments : appointments.length,
            appointmentTypes : {
                scheduledAppointments : scheduledAppointments.length,
                cancelledAppointments : cancelledAppointments.length,
                completedAppointments : completedAppointments.length,
                pendingAppointments  : pendingAppointments.length,
            }
        }
    }

}

export { reportServiceClass }