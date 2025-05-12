import { app } from "./app";
import { connectDB } from "./config/db";
import { ENV_VARS } from "./config/envVars";

const PORT = ENV_VARS.PORT

app.listen(PORT, () => {
    console.log(`Server iniciado: http://localhost:${PORT}`);
    connectDB();
})
