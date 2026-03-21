import UserModel from "../models/User.model.js";
import userService from "./user.service.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {logoutUser} from "../controllers/user.controller.js"

const get = async (id) => {
    const profile = await userService.findUserOnDb(id, "id");

    if (!profile) {
        throw {
            statusFromService: 404,
            msgFromService: "profile not found",
        };
    }

    return profile;
};

const edit = async (req) => {
    const { userName, userAddress, oldPassword, newPassword, confirmPassword } =
        req.body;

    const profileOnDb = await userService.findUserOnDb(req.user._id, "id");

    if (!profileOnDb) {
        throw {
            statusFromService: 400,
            msgFromService: "profile does not exist",
        };
    }

    profileOnDb.userName = userName || profileOnDb.userName;
    profileOnDb.userAddress = userAddress || profileOnDb.userAddress;

    if (req?.file !== undefined && Object.hasOwn(req?.file, "path")) {
        const upload = await uploadOnCloudinary(req.file.path);
        if (!upload) {
            throw {
                statusFromService: 400,
                msgFromService: "could not upload Profile image",
            };
        }
        profileOnDb.profileImage = upload.url;
    }

    const requiredKeys = ["oldPassword", "newPassword", "confirmPassword"];
    const hasSomeKeys = requiredKeys.some((key) => Object.hasOwn(req.body, key));
    // const hasAllKeys = requiredKeys.every((key) =>
    //     Object.hasOwn(req.body, key)
    // );

    if (hasSomeKeys) {
        // if (hasAllKeys) {
        const cp = confirmPassword?.trim();
        const np = newPassword?.trim();
        const op = oldPassword?.trim();

        if (!cp || !np || cp.length < 6 || np.length < 6 || cp !== np) {
            throw {
                statusFromService: 408,
                msgFromService: { confirmPassword: "invalid credentials" },
            };
        }

        if (!op || op.length < 6) {
            throw {
                statusFromService: 408,
                msgFromService: { oldPassword: "invalid credentials" },
            };
        }

        const isOldCorrect = await profileOnDb.isPasswordCorrect(oldPassword);

        if (!isOldCorrect) {
            throw {
                statusFromService: 408,
                msgFromService: { oldPassword: "invalid credentials" },
            };
        }

        profileOnDb.userPassword = cp;
        // }
    }

    const edited = await profileOnDb.save();

    if (!edited) {
        throw {
            statusFromService: 400,
            msgFromService: "could not update Profile",
        };
    }
    return edited.toObject({
        versionKey: false,
        transform: (doc, ret) => {
            delete ret.userPassword;
            delete ret.refreshToken;
            return ret;
        },
    });
};

const deactivate = async (req, res) => {
    const deactivate = await UserModel.findByIdAndUpdate(req.user._id, { isDeactive: true });
    await logoutUser(req, res);

    // if (!deactivate) {
    //     throw {
    //         statusFromService: 400,
    //         msgFromService: "could not deactivate User",
    //     };
    // }
    // return deactivate;
};

const remove = async (id) => {
    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) {
        throw {
            statusFromService: 400,
            msgFromService: "could not delete User",
        };
    }
    return deleted;
};
export default { get, edit, remove, deactivate };
