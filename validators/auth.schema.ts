import { z } from "zod";

const authLoginSchema = z.object({
    body : z.object({
        email : z.string({ error : "Email is required" }),
        password : z.string({ error : "Password is required" }),
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
        email : z.string({ error : "Email is required" }),
        role : z.string({ error : "Role is required" })
    })
})

const authResetPassSchema = z.object({
    params : z.object({
        token : z.string({error : "Invalid"})
    }),
    body : z.object({
        password : z.string({ error : "Please provide a password" })
    })
})

export { authLoginSchema, authLogoutSchema, authForgetSchema, authResetPassSchema };