import { z } from "zod";

const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authLoginSchema = z.object({
    body : z.object({
        email : z.string({ error : "Email is required" }).regex(emailRegex, { error : "Please provide a valid email address" }),
        password : z.string({ error : "Password is required" }).regex(passwordRegex, { error : "Please provide a valid password" }),
        role : z.string({ error : "Role is required" })
    })
});

const authLogoutSchema = z.object({
    cookies : z.object({
        token : z.string({ error : "Please login" })
    })
})

const authForgetSchema = z.object({
    body : z.object({
        mail : z.string({ error : "Email is required" }),
        role : z.string({ error : "Role is required" })
    })
})

const authResetPassSchema = z.object({
    params : z.object({
        token : z.string({error : "Invalid"})
    }),
    body : z.object({
        password : z.string({ error : "Please provide a password" }).regex(passwordRegex, { error : "Please provide a valid password" })
    })
})

export { authLoginSchema, authLogoutSchema, authForgetSchema, authResetPassSchema };