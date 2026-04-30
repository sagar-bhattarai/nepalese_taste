import config from "../configs/config.js";
import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        // console.log(">>>>>>>>>>.",token)

        try {
            const decoded = jwt.verify(token, config.accessToken.secret);
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