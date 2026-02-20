import { z } from "zod"

const generatePaymentToken = z.object({
    body : z.object({
        id : z.string({ error : "Please provide appointment id" }),
        flag : z.boolean({ error : "Please provide payment flag" })
    })
})

const decodePaymentToken = z.object({
    body : z.object({
        token : z.string({ error : "Please provide payment token" })
    })
})

export { generatePaymentToken, decodePaymentToken }