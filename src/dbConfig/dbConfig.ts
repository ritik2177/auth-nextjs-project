import mongoose from "mongoose";

let isConnected = false;

export async function connection() {
    if (isConnected) {
        return;
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log('Something went wrong connecting to MongoDB');
        console.log(error);
        throw error;
    }
}