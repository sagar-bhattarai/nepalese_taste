import config from "../configs/config.js";
import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {

    // console.log("AUTH HEADER:", req.headers.authorization);
    // console.log("COOKIES:", req.cookies);

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
        console.log("\n \n <<<<<<< Authentication error >>>>>>> \n \n", error);

        let message = "Please login";
        let code = "";

        if (error.message == "invalid or expired token.") {
            message = `invalid token, please login with valid credentials.`
            code = "INVALID_TOKEN"
        } else if (error.message == "User not authenticated.") {
            message = ` please login with valid credentials.`
            code = "EMPTY_TOKEN"
        }

        return res.status(401).json({
            error: true,
            message: message,
            code: code
        });
    }

}

export default auth 






























// import config from "../configs/config.js";
// import UserModel from "../models/User.model.js";
// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {

//     // console.log("AUTH HEADER:", req.headers.authorization);
//     // console.log("COOKIES:", req.cookies);

//     try {
//         if (!(req.headers.authorization || req.cookies?.accessToken)) {
//             throw {
//                 status: 401,
//                 message: "User not authenticated."
//             }
//         }

//         const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.accessToken;
//         if (!token) {
//             throw {
//                 status: 401,
//                 message: "unauthorized request."
//             }
//         }

//         const decodedToken = jwt.verify(token, config.accessToken.secret);
//         if (!decodedToken) {
//             throw {
//                 status: 401,
//                 message: "invalid or expired token."
//             }
//         }

//         const user = await UserModel.findByIdAndUpdate(decodedToken._id, { isActive: true }).select("-userPassword -refreshToken -createdAt -updatedAt -__v");
//         req.user = user;
//         req.roles = user.userRoles;
//         next();
//     } catch (error) {
//         console.log("\n \n <<<<<<< Authentication error >>>>>>> \n \n", error);

//         let message = "Please login";
//         let code = "";

//         if (error.message == "invalid or expired token.") {
//             message = `invalid token, please login with valid credentials.`
//             code = "INVALID_TOKEN"
//         } else if (error.message == "User not authenticated.") {
//             message = ` please login with valid credentials.`
//             code = "EMPTY_TOKEN"
//         }

//         return res.status(401).json({
//             error: true,
//             message: message,
//             code: code
//         });
//     }

// }

// export default auth 