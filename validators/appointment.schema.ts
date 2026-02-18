import { z } from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createAppointmentSchema = z.object({
    body : z.object({
        name : z.string({ error : "appointment name required" }),
        userEmail : z.string({ error : "user email required" }).regex(emailRegex, { error : "Please provide a valid user email" }),
        serviceProviderEmail : z.string({ error : "service provider email required" }).regex(emailRegex, { error : "Please provide a valid service provider email" }),
        date : z.string({ error : "Please provide a scheduled date for the appointment" }),
        time : z.string({ error : "Please provide a specific timing of the appointment" })
    })
})

const getAppointmentSchema = z.object({
    body : z.object({
        id : z.string({ error : "appointment id is required" })
    })
})

const updateAppointmentSchema = z.object({
    body : z.object({
        _id : z.string(),
        userEmail : z.string({ error : "user email required" }).regex(emailRegex, { error : "Please provide a valid user email" }).optional(),
        serviceProviderEmail : z.string({ error : "service provider email required" }).regex(emailRegex, { error : "Please provide a valid service provider email" }).optional(),
    })
})

export { createAppointmentSchema, getAppointmentSchema, updateAppointmentSchema }