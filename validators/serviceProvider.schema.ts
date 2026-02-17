import { z } from "zod"

const createServicePSchema = z.object({
    body : z.object({
        name : z.string({ error : "Please provide a user name" }),
        email : z.string({ error : "Please provide an email address" }),
        password : z.string({ error : "Please provide a password" })
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
    cookies : z.object({
        token : z.string({ error : "Please validate yourself by logging in" })
    })
})

export { createServicePSchema, getServicePSchema, getByEmailServicePSchema, deleteServicePSchema }