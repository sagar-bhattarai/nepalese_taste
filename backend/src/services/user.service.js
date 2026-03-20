import UserModel from "../models/User.model.js";
import OtpModel from "../models/Otp.model.js";
import uploadImage from "../utility/uploadImage.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendMail from "../utility/mail.js";

const all = async () => {
    return await UserModel.find();
}

const single = async (id) => {
    return await UserModel.findById(id);
}

const edit = async (req) => {

    const user = await UserModel.findById(req.params.id);

    if (!user) {
        throw {
            customStatus: 400,
            customMessage: "user not found.",
        };
    }

    let url = await uploadImage(req.body?.profileImage);
    if (!url) {
        url = user.profileImage;
    }

    console.log(" req.body.userRoles", req.body.userRoles)
    const data = {
        userName: req.body.userName ?? user.userName,
        userAddress: req.body.userAddress ?? user.userAddress,
        userRoles: req.body.userRoles ?? user.userRoles,
        isActive: req.body.isActive ?? user.isActive,
        isEmailVerified: req.body.isEmailVerified ?? user.isEmailVerified,
        profileImage: url ?? "",
    }

    return await UserModel.findByIdAndUpdate(req.params.id, data, { new: true }).select("-userPassword -refreshToken -createdAt -updatedAt -__v");
}

const deactivate = async (req) => {
    await UserModel.findByIdAndUpdate(req.user._id, { isActive: false });
}

const reset = async (req) => {
    if (req.body.newPassword !== req.body.confirmPassword) {
        throw {
            customStatus: 400,
            customMessage: "passwords doesnot match.",
        };
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword.toString(), 10);
    const resetted = await UserModel.findByIdAndUpdate(req.user._id, { userPassword: hashedPassword }, { new: true });
    if (!resetted) {
        throw {
            customStatus: 400,
            customMessage: "error while resetting password.",
        };
    }
}

const generateOtp = async (id) => {
    const otp = crypto.randomInt(100000, 1000000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    const expiry = Date.now() + 5 * 60 * 1000;

    const saved = await OtpModel.findOneAndUpdate(
        { userId: id },
        {
            otp: hashedOtp.toString(),
            expiry
        },
        { upsert: true, new: true }
    );

    if (!saved) {
        throw {
            customStatus: 400,
            customMessage: "error while saving otp.",
        };
    }
    return otp;
}

const sendOtpOnMail = async (user) => {
    const otp = await generateOtp(user._id)

    const mailOptions = {
        otp,
        userEmail: user.userEmail,
        subject: "ecommerce app",
        text: `Your OTP is, ${otp}  \n Valid only for 5 minutes.`
    }

    await sendMail(mailOptions);
}

const verifyOtp = async (req) => {
    const value = await OtpModel.findOne({ userId: req.user._id });
    if (!value) {
        throw {
            customStatus: 400,
            customMessage: "OTP not found.",
        };
    }

    if (value.expiry < Date.now()) {
        throw {
            customStatus: 400,
            customMessage: "expired otp.",
        };
    }

    const verified = await bcrypt.compare(req.body.otp, value.otp);
    if (!verified) {
        throw {
            customStatus: 400,
            customMessage: "invalid otp.",
        };
    }
    await OtpModel.findOneAndDelete({ userId: req.user._id });
    return await UserModel.findByIdAndUpdate(
        req.user._id,
        { isEmailVerified: true },
        { new: true, runValidators: true }
    ).select("-userPassword -refreshToken -createdAt -updatedAt -__v");
}

const editRole = async (req) => {
    let option;
    if (req.body.makeMerchant) {
        option = { $addToSet: { userRoles: { $each: ["MERCHANT", "CUSTOMER"] } } }
    } else {
        option = { $pull: { userRoles: "MERCHANT" } }
    }
    return await UserModel.findByIdAndUpdate(
        req.params.id,
        option,
        { new: true }
    ).select("-userPassword -refreshToken -createdAt -updatedAt -__v");
}

export default { all, single, edit, deactivate, reset, verifyOtp, sendOtpOnMail, editRole }