import { z } from "zod"

const createUserSchema = z.object({
    body : z.object({
        name : z.string({ error : "Please provide a user name" }),
        email : z.string({ error : "Please provide an email address" }),
        password : z.string({ error : "Please provide a password" })
    })
})

const getUserSchema = z.object({
    body : z.object({
        id : z.string({ error : "Please provide an id" })
    })
})

const getByEmailUserSchema = z.object({
    body : z.object({
        email : z.string({ error : "Please provide an email address" })
    })
})

const deleteUserSchema = z.object({
    body : z.object({
        id : z.string({ error : "Please provide an id" })
    }),
    cookies : z.object({
        token : z.string({ error : "Please validate yourself by logging in" })
    })
})

export { createUserSchema, getUserSchema, getByEmailUserSchema, deleteUserSchema }