import mongoose from "mongoose";

export const connect = async () => {
    const DBUrl = process.env.DBUrl;
    const connection = await mongoose.connect(DBUrl);
    console.log("connection is ", connection.connection.host);
}