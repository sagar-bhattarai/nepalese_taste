import UserModel from "../models/User.model.js";
// import userService from "../services/user.service.js";
// import sendMail from "../utility/mail.js";
import uploadImage from "../utility/uploadImage.js";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";


const generateTokens = async (user) => {
    try {

        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { refreshToken, accessToken };

    } catch (error) {
        throw {
            customStatus: 400,
            customMessage: `Error while generating tokens. ${error}`,
        };
    }
};

const register = async (req) => {
    const existingUser = await UserModel.findOne({ userEmail: req.body.userEmail });

    if (existingUser) {
        throw {
            customStatus: 400,
            customMessage: "Duplicate entry.",
        };
    }

    // const url = await uploadImage(req);
    // if (url) {
    //     req.body.profileImage = url;
    // }

    const newUser = new UserModel(req.body);
    await newUser.save();
    
    const { userPassword, __v, createdAt, updatedAt, ...safeUser } = newUser.toObject();

    // await userService.sendOtpOnMail(newUser);
    return safeUser;
};

const login = async (req) => {
    const user = await UserModel.findOne({ userEmail: req.userEmail });
    if (!user) {
        throw {
            customStatus: 400,
            customMessage: "Invalid credentials.",
        };
    }

    const passwordValidate = await user.isPasswordCorrect(req.userPassword);
    if (!passwordValidate) {
        throw {
            customStatus: 400,
            customMessage: "Invalid credentials.",
        };
    }

    const { refreshToken, accessToken } = await generateTokens(user);
    const loggedInUser = await UserModel.findById(user._id).select("-userPassword -refreshToken -createdAt -updatedAt -__v");

    return {
        loggedInUser,
        refreshToken,
        accessToken,
    }
};

const logout = async (id) => {
    const user = await UserModel.findByIdAndUpdate(id, { refreshToken: "" });
    return true;
};

const refreshAuthToken = async (req) => {

    const token = req.cookies?.refreshToken;

    if (!token) {
        throw { customStatus: 401, customMessage: "No refresh token" };
    }

    const verified = jwt.verify(token, config.refreshToken.secret);

    const user = await UserModel.findById(verified._id);

    if (!user) {
        throw {
            customStatus: 400,
            customMessage: "Invalid credentials.",
        };
    }

    // Refresh token rotation (one-time use tokens)
    const { refreshToken, accessToken } = await generateTokens(user);

    return { refreshToken, accessToken };
}

export default { register, login, logout, refreshAuthToken };
