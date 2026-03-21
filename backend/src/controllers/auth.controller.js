import authService from "../services/auth.service.js"; 
import config from "../configs/config.js";

const options = {
    httpOnly: true,
    secure: true,
};

const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req);

        return res
            .status(200)
            .json({ status: config.api , data: result , message: "user registered successfully." });
    } catch (error) {
        return res
            .status(error.customStatus || 500)
            .json({ error: true , message: error.customMessage || "error while registering user." });
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        return res
            .status(200)
            .cookie("refreshToken", result.refreshToken, options)
            .cookie("accessToken", result.accessToken, options)
            .json({ status: config.api , data: result , message: "user logined successfully." });
    } catch (error) {
        return res
            .status(error.customStatus || 500)
            .json({ error: true , message: error.customMessage || "error while login." });
    }
};

const logoutUser = async (req, res) => {
    try {
        const result = await authService.logout(req.user._id);

        return res
            .status(200) 
            .cookie("refreshToken", "", options)
            .cookie("accessToken", "", options)
            .json({ status: config.api, message: "user logged out successfully." });
    } catch (error) {
        return res
            .status( 500)
            .json({ error: true , message:"error while loging out." });
    }
};


export { registerUser, loginUser, logoutUser};