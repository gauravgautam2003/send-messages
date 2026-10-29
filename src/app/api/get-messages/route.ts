import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import connectDB from "@/lib/db";
import { User } from "next-auth";
import mongoose from "mongoose";

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

    const userId = new mongoose.Types.ObjectId(user._id)


    try {
        // write aggregation pipeline
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: "$messages" },
            { $sort: { '$messages.createdAt': -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } }
        ])

        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: user[0].messages
        }, { status: 200 })

    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, { status: 500 })
    }
}