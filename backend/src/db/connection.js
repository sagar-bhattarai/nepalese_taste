import mongoose from "mongoose";
import { DB_NAME } from "../constants/constant.js";
import config from "../configs/config.js";

const databaseConnection = async () => {
    try {
        // const connectionInstance = await mongoose.connect(`${config.mongodb_url}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect(`${config.mongodb_url}}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
        // console.log(connectionInstance.connection.db.s.namespace)
    } catch (error) {
        console.error("Database Connection Failed: ", error);
        process.exit(1);
    }
}

export default databaseConnection;