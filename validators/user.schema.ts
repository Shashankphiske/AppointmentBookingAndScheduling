import { z } from "zod"

const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUserSchema = z.object({
    body : z.object({
        name : z.string({ error : "Please provide a user name" }),
        email : z.string({ error : "Please provide an email address" }).regex(emailRegex, { error : "Please provide a valid email address" }),
        password : z.string({ error : "Please provide a password" }).regex(passwordRegex, { error : "Please provide a vaid email address" })
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
})

export { createUserSchema, getUserSchema, getByEmailUserSchema, deleteUserSchema }