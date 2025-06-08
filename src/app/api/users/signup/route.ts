import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";


connection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        console.log("User exists:", !!user);

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        //hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("Password hashed");


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verificatio email

        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
    

        console.log("Verification email sent");
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
         
    } catch (error : unknown) {
        if (error instanceof Error) {
        return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}