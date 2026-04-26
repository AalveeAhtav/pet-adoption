import app from "./app.js";
import env from "./config/env.js";

app.listen(env.backendPort, () => {
    console.log(`Backend listening on http://localhost:${env.backendPort}`);
});
