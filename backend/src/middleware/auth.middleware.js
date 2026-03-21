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
        console.log("error",error)

        return res
            .status(error.status || 500)
            .json({ error: true, message: error.message || "internal server error in auth middleware" })
    }

}

export default auth 