import { z } from "zod";

const authLoginSchema = z.object({
    body : z.object({
        email : z.string({ error : "Email is required" }),
        password : z.string({ error : "Password is required" })
    })
});

const authLogoutSchema = z.object({
    cookies : z.object({
        token : z.string({ error : "Please login" })
    })
})

export { authLoginSchema, authLogoutSchema };