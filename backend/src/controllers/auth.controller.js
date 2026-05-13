import authService from "../services/auth.service.js";
import config from "../configs/config.js";

const options = {
    httpOnly: true,
    secure: true, // use this in Production
    // secure: false, // it is for localhost
    sameSite: "lax",
};

const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req);

        return res
            .status(200)
            .json({
                status: config.api,
                userData: result,
                message: "user registered successfully."
            });
    } catch (error) {
        console.log(error)
        return res
            .status(error.customStatus || 500)
            .json({ error: true, message: error.customMessage || "error while registering user." });
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        return res
            .status(200)
            .cookie("refreshToken", result.refreshToken, options)
            // .cookie("accessToken", result.accessToken, options)
            .json({
                accessToken: result.accessToken,
                userData: result.loggedInUser,
                message: "login success",
            });

    } catch (error) {
        return res
            .status(error.customStatus || 500)
            .json({ error: true, message: error.customMessage || "error while login." });
    }
};

const logoutUser = async (req, res) => {
    try {
        const result = await authService.logout(req.user._id);

        return res
            .status(200)
            .clearCookie("refreshToken", options)
            // .cookie("accessToken", "", options)
            .json({ status: config.api, message: "user logged out successfully." });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "error while loging out." });
    }
};

const tokenRefresh = async (req, res) => {
    try {
        const result = await authService.refreshAuthToken(req);

        // return res
        //     .status(200)
        //     .cookie("refreshToken", result.refreshToken, options)
        //     .json({ status: config.api, data: result, message: "Token Refreshed successfully." });

        return res
            .status(200)
            .cookie("refreshToken", result.refreshToken, options)
            .json({
                accessToken: result.accessToken,
                message: "Token Refreshed successfully.",
            });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "error while refreshing auth token." });
    }
};

export { registerUser, loginUser, logoutUser, tokenRefresh };