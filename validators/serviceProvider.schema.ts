import { z } from "zod"

const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createServicePSchema = z.object({
    body : z.object({
        name : z.string({ error : "Please provide a user name" }),
        email : z.string({ error : "Please provide an email address" }).regex(emailRegex, { error : "Please provide a valid email address" }),
        password : z.string({ error : "Please provide a password" }).regex(passwordRegex, { error : "Please provide a valid password" }),
        serviceName : z.string({ error : "Please provide your service name" }),
        price : z.number(),
        duration : z.number(),
        description : z.string()
    })
})

const getServicePSchema = z.object({
    body : z.object({
        id : z.string({ error : "Please provide an id" })
    })
})

const getByEmailServicePSchema = z.object({
    body : z.object({
        email : z.string({ error : "Please provide an email address" })
    })
})

const deleteServicePSchema = z.object({
    body : z.object({
        id : z.string({ error : "Please provide an id" })
    }),
})

export { createServicePSchema, getServicePSchema, getByEmailServicePSchema, deleteServicePSchema }