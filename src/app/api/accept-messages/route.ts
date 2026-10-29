import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import connectDB from "@/lib/db";
import { User } from "next-auth";

export async function POST(request: Request) {
    await connectDB()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authencticated"
        }, { status: 404 })
    }

    const userId = user._id
    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMessage: acceptMessages }, { new: true })

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update user status to accept message"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "Message acceptance updated successfully"
        }, { status: 200 })

    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, { status: 500 })
    }
}

export async function GET(request: Request) {
    await connectDB()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authencticated"
        }, { status: 404 })
    }

    const userId = user._id
    try {
        const foundUser = await UserModel.findById(userId)

        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not Found"
            }, { status: 404 })
        }

        return Response.json({
            success: false,
            isAcceptingMessages: foundUser.isAcceptingMessage
        }, { status: 200 })
    } catch (error) {
        console.log("Error is getting message acceptance status")
        return Response.json({
            success: false,
            message: "Error is getting message acceptance status"
        }, { status: 500 })
    }
}    