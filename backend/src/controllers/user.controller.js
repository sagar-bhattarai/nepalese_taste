import config from "../configs/config.js";
import userService from "../services/user.service.js";

const options = {
  httpOnly: true,
  secure: true,
};

const getAllUsers = async (req, res) => {
    try {
        const result = await userService.all(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "users fetched successfully." });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while fetching users." });
    }
}
const getUserById = async (req, res) => {
    try {
        const result = await userService.single(req.params.id);

        return res
            .status(200)
            .json({ api: config.api, result, message: "user fetched successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while fetching user." });
    }
}
const updateUser = async (req, res) => {
  try {
    const result = await userService.edit(req);

    return res
      .status(200)
      .json({
        status: config.api,
        data: result,
        message: "user updated successfully.",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "error while updating user." });
  }
};
const deactivateUser = async (req, res) => {
  try {
    const result = await userService.deactivate(req);

    return res
      .status(200)
      .cookie("refreshToken", "", options)
      .cookie("accessToken", "", options)
      .json({ status: config.api, message: "user deactivated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "error while deactivating user." });
  }
};
const sendOtp = async (req, res) => {
  try {
    const result = await userService.sendOtpOnMail(req.user);
    return res
      .status(200)
      .json({
        status: config.api,
        message: "otp has been sent to user email.",
      });
  } catch (error) {
    return res
      .status( error.customStatus || 500)
      .json({ error: true, message: error.customMessage || "error while generating otp." });
  }
};
const resetPassword = async (req, res) => {
  try {
    const result = await userService.reset(req);

    return res
      .status(200)
      .json({
        status: config.api,
        data: result,
        message: "password resetted successfully.",
      });
  } catch (error) {
    return res
      .status(error.customStatus || 500)
      .json({ error: true, message: error.customMessage || "error while reseting password." });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const result = await userService.verifyOtp(req);

    return res
      .status(200)
      .json({ status: config.api, data: result, message: "email verified successfully." });
  } catch (error) {
    return res
      .status(error.customStatus || 500)
      .json({ error: true, message: error.customMessage || "error while verifying email." });
  }
};
const updateUserRole = async (req, res) => {
  try {
    const result = await userService.editRole(req);

    return res
      .status(200)
      .json({ status: config.api, data: result, message: "role updated successfully." });
  } catch (error) {
    console.log(error)
    return res
      .status(error.customStatus || 500)
      .json({ error: true, message: error.customMessage || "error while editing role." });
  }
};

export { updateUser, deactivateUser, sendOtp, resetPassword, verifyEmail, updateUserRole, getAllUsers, getUserById };
