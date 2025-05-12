import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = env.PORT

app.listen(PORT, () => {
    console.log(`Server iniciado: http://localhost:${PORT}`);
    connectDB();
})
