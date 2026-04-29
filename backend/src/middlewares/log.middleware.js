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

const getUserDetails = async (req) => {

    // Extract user from JWT if exists
    let user = null;
    const clientIp = getClientIp(req);
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (token) {
        const decodedToken = jwt.verify(token, config.accessToken.secret);
        user = await UserModel.findById(decodedToken?._id)
            .select("userName userRoles");
    }

    const details = user
        ? { userName: user.userName, userRole: user.userRoles, _id: user._id, ip: clientIp }
        : { userName: "Anonymous", ip: clientIp };

    let log;
    return log = `${req.method} ${req.originalUrl} | user: ${JSON.stringify(details)} | ${new Date().toISOString()}\n`;
}

const logger = async (req, res, next) => {
    try {
        // Ensure log directory exists
        if (!fsSync.existsSync(LOG_DIR)) {
            await fs.mkdir(LOG_DIR, { recursive: true });
        }

        const log = await getUserDetails(req);

        await fs.appendFile(LOG_FILE, log);

    } catch (error) {
        console.error("Log middleware error:", error.message);
    }
    
    next();
}


export default logger;









































// import fs from "fs/promises";
// import fsSync from "fs";
// import path from "path";
// import jwt from "jsonwebtoken";
// import config from "../configs/config.js";
// import UserModel from "../models/User.model.js";

// const LOG_DIR = "./logs";
// const LOG_FILE = path.join(LOG_DIR, "app.log");

// const getClientIp = (req) => {
//     return (
//         req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//         req.headers["x-real-ip"] ||
//         req.socket?.remoteAddress ||
//         "UNKNOWN"
//     );
// };

// const logger = async (req, res, next) => {
//     try {
//         // Ensure log directory exists
//         if (!fsSync.existsSync(LOG_DIR)) {
//             await fs.mkdir(LOG_DIR, { recursive: true });
//         }

//         // Extract user from JWT if exists
//         let user = null;
//         const clientIp = getClientIp(req);
//         const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

//         if (token) {
//             try {
//                 const decodedToken = jwt.verify(token, config.accessToken.secret);
//                 user = await UserModel.findById(decodedToken?._id)
//                     .select("userName userRoles");
//             } catch (error) {
//                 console.log("\n <<<<<<< log middleware >>>>>>> \n \t", error.message);

//                 user = null;
//                 let message = "Session expired. Please login again.";
//                 let code = "TOKEN_EXPIRED";

//                 if (error.message == "invalid token") {
//                     message = `invalid token, please login with valid credentials.`
//                     code = "INVALID_TOKEN"
//                 }

//                 return res.status(401).json({
//                     error: true,
//                     message: message,
//                     code: code
//                 });
//             }
//         }

//         const details = user
//             ? { userName: user.userName, userRole: user.userRoles, _id: user._id, ip: clientIp }
//             : { userName: "Anonymous", ip: clientIp };

//         const log = `${req.method} ${req.originalUrl} | user: ${JSON.stringify(
//             details
//         )} | ${new Date().toISOString()}\n`;

//         await fs.appendFile(LOG_FILE, log);
//     } catch (err) {
//         console.error("Log middleware error:", err.message);
//     }

//     next();
// }

// export default logger;