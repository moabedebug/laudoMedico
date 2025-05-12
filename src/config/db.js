import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try{
        const con = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB conectado:" + con.connection.host)
    } catch (err) {
        console.log("Erro de conexão do MongoDB:" + err.massage)
        process.exit(1)
    }
}
