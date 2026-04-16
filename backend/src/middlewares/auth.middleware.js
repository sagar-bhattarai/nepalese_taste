import config from "../configs/config.js";
import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        if (!(req.headers.authorization || req.cookies?.accessToken)) {
            throw {
                status: 401,
                message: "User not authenticated."
            }
        }

        const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.accessToken;
        if (!token) {
            throw {
                status: 401,
                message: "unauthorized request."
            }
        }

        const decodedToken = jwt.verify(token, config.accessToken.secret);
        if (!decodedToken) {
            throw {
                status: 401,
                message: "invalid or expired token."
            }
        }

        const user = await UserModel.findByIdAndUpdate(decodedToken._id, { isActive: true }).select("-userPassword -refreshToken -createdAt -updatedAt -__v");
        req.user = user;
        req.roles = user.userRoles;
        next();
    } catch (error) {
        console.log("\n \n <<<<<<< Authentication error >>>>>>> \n \n", error)

        return res.status(401).json({
            error: true,
            message: "Session expired. Please login again.",
            code: "TOKEN_EXPIRED"
        });
    }

}

export default auth 