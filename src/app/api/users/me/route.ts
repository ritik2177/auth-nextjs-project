import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/dbConfig/dbConfig";

connection();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error:unknown) {
        if (error instanceof Error) {
        return NextResponse.json({error: error.message}, {status: 400});
        }
    }

}
