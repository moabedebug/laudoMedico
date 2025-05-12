import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    try{
        const con = await mongoose.connect(env.MONGO_URI)
        console.log("MongoDB conectado:" + con.connection.host)
    } catch (err) {
        console.log("Erro de conexão do MongoDB:" + err.massage)
        process.exit(1)
    }
}
