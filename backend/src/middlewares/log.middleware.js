import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";
import UserModel from "../models/User.model.js";

const LOG_DIR = "./logs";
const LOG_FILE = path.join(LOG_DIR, "app.log");

const getClientIp = (req) => {
    return (
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "UNKNOWN"
    );
};

const logger = async (req, res, next) => {
    try {
        // Ensure log directory exists
        if (!fsSync.existsSync(LOG_DIR)) {
            await fs.mkdir(LOG_DIR, { recursive: true });
        }

        // Extract user from JWT if exists
        let user = null;
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, config.accessToken.secret);
                user = await UserModel.findById(decodedToken?._id)
                    .select("userName userRoles");
            } catch {
                user = null;
            }
        }
        const clientIp = getClientIp(req);
        const details = user
            ? { userName: user.userName, userRole: user.userRoles, _id: user._id, ip: clientIp }
            : { userName: "Anonymous", ip: clientIp };

        const log = `${req.method} ${req.originalUrl} | user: ${JSON.stringify(
            details
        )} | ${new Date().toISOString()}\n`;

        await fs.appendFile(LOG_FILE, log);
    } catch (err) {
        console.error("Log middleware error:", err.message);
    }

    next();
}

export default logger;