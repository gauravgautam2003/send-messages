import nodemailer from "nodemailer";
import verificationEmail from "../../emails/VerificationEmail";
import { render } from "@react-email/render"
import { ApiResponse } from "@/types/ApiPresponse";
// create a transporter object using SMTP transport


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
});


export const sendVerificationEmail = async (email: string, username: string, otp: string): Promise<ApiResponse> => {
    const emailHtml = await render(verificationEmail({ username, otp }));
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || "", // sender address
            to: email, // listx of receivers
            subject: "Send Messages | Verification Code", // Subject line
            html: emailHtml, // html body
        });
        
        return {
            success: true, 
            message: "Verification email sent successfully"
        }
    } catch (error) {
        console.error("Error sending verification email:", error);
        return {
            success: false, 
            message: "Failed to verification email"
        }
    }
}