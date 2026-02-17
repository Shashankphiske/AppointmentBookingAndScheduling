import { z } from "zod"

const createAppointmentSchema = z.object({
    body : z.object({
        name : z.string({ error : "appointment name required" }),
        userEmail : z.string({ error : "user email required" }),
        serviceProviderEmail : z.string({ error : "service provider email required" })
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
    })
})

export { createAppointmentSchema, getAppointmentSchema, updateAppointmentSchema }