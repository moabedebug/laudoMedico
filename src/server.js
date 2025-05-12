import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";

const PORT = ENV_VARS.PORT

app.listen(PORT, () => {
    console.log(`Server iniciado: http://localhost:${PORT}`);
    connectDB();
})
