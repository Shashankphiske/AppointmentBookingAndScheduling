import type { ObjectId } from "mongodb";

interface sendMail {
    send(to : string, message : string) : void;
}

class emailClass implements sendMail {
    send(to : string, message : string) {
        console.log(`Email sent to ${to} with the message : ${message}`);
    }

    sendAppointment (sp : string, user : string, appointment : string) {
        console.log(`Email sent to Service Provider : ${sp} and User : ${user} regarding their scheduled appointment with the id : ${appointment}`);
    }

    sendUpdatedAppointment (sp : string, user : string, appointment : string) {
        console.log(`Email sent to Service Provider : ${sp} and User : ${user} regarding their updated and rescheduled appointment with the id : ${appointment}`);
    }

    sendDeletedAppointment (sp : string, user : string, appointment : string) {
        console.log(`Email sent to Service Provider : ${sp} and User : ${user} regarding the cancelation of their appointment with the id : ${appointment}`);
    }
}

class smsClass implements sendMail {
    send (to : string, message : string) {
        console.log(`SMS sent to ${to} with the message : ${message}`);
    }
}

export { emailClass, smsClass };