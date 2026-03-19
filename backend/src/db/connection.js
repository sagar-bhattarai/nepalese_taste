import mongoose from "mongoose";
import { DB_NAME } from "../constants/constant.js";
import config from "../configs/config.js";

const databaseConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${config.mongodb_url}/${DB_NAME}`);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("Database Connection Failed: ", error);
        process.exit(1);
    }
}

export default databaseConnection;