import connectDB from "@/lib/db";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await connectDB()

    try {
        const { username, code } = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }

        const isValidCode = user.verifyCode == code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isValidCode && isCodeNotExpired) {
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "Account verified successfully"
            }, {
                status: 200
            })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "verification code has expired, please signup again to get a new code"
            }, {
                status: 400
            })
        } else {
            return Response.json({
                success: false,
                message: "Icorrect verification code"
            }, {
                status: 400
            })
        }
    } catch (error) {
        console.error("Error verfying code", error)
        return Response.json({
            success: false,
            message: "Error verfying code"
        }, {
            status: 500
        })
    }
}