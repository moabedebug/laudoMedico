import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = env.PORT

async function startServer() {
    try {
        await connectDB();
        console.log("Conexão com o MongoDB estabelecida.");

        app.listen(PORT, () => {
            console.log(`Server iniciado: http://localhost:${PORT}`);
        })
    } catch (err) {
        console.error("Erro ao conectar com o banco de dados:", err.message);
        process.exit(1);
    }
}

startServer();
