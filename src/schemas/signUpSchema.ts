import { z } from "zod"

export const usernameValidation = z
        .string()
        .min(2, "Username must be atleast 2 characters")
        .max(20, "Username must be no more than 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Usename must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid emial address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"})
})        