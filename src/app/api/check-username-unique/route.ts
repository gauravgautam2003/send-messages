import connectDB from "@/lib/db";
import UserModel from "@/model/User";
import { z } from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await connectDB()
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username")
        }

        // validation with zod
        const result = UsernameQuerySchema.safeParse(queryParam)

        if(!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameError.length > 0 ?usernameError.join(", ") : "Invalid query parameters"
            }, {status: 400})
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})
        if(existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is unique"
            }, {status: 201})
        }

        return Response.json({
                success: false,
                message: "User already exist with this unique username"
            }, {status: 400})
    } catch (error) {
        console.error("Unique username error", error)
        return Response.json({
            success: false,
            message: "Unique username error"
        }, {
            status: 500
        })
    }
}