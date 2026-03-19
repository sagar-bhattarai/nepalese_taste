import { server } from "./server.js";
import config from "./configs/config.js";
import databaseConnection from "../src/db/connection.js"

const startServer = async () => {
    try {
        databaseConnection();
        server.listen(process.env.PORT || 5000, () => {
            console.log(`\nEcommerce app is listening on port ${process.env.BASE_URL}:${config.api.port}`)
        });
    } catch (error) {
        console.error("\nServer Startup Failed: ", error);
        process.exit(1);
    }
}

startServer();