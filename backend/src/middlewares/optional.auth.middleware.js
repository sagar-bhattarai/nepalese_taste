import config from "../configs/config.js";
import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("optionalAuth",authHeader)

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded", decoded)
            req.user = decoded;
        } catch (err) {
            req.user = null; // invalid token → treat as guest
        }
    } else {
        req.user = null; // no token → guest
    }

    next();
};


export default optionalAuth 