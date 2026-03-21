import mongoose from "mongoose";
import { CUSTOMER, MERCHANT, STAFF } from "../constants/roles.constant.js";
import bcrypt from "bcrypt";
import config from "../configs/config.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Name Is Required"],
            trim: true,
            lowercase: true,
        },
        userEmail: {
            type: String,
            required: [true, "Email Is Required"],
            trim: true,
            unique: true,
            lowercase: true,
        },
        userPassword: {
            type: String,
            required: [true, "Password Is Required"],
            trim: true,
            minLength: [4, "Password must be at least 6 characters long"],
        },
        userAddress: {
            type: String,
            required: [true, "Address Is Required"],
            trim: true,
            lowercase: true,
        },
        profileImage: String,
        refreshToken: String,
        userRoles: {
            type: [String],
            enum: [CUSTOMER, MERCHANT, STAFF],
            default: [CUSTOMER],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);


userSchema.pre("save", async function () {
    // if (!this.isModified("userPassword")) return next();
    // this.userPassword = await bcrypt.hash(this.userPassword, 10);


    // hash password only if modified
    if (this.isModified("userPassword")) {
        this.userPassword = await bcrypt.hash(this.userPassword, 10);
    }
});


// check if password is correct
userSchema.methods.isPasswordCorrect = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.userPassword);
};

// custom functions
userSchema.methods.generateAccessToken = async function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                userEmail: this.userEmail,
            },
            config.accessToken.secret,
            {
                expiresIn: config.accessToken.expiry,
            },
        );
    } catch (error) {
        throw error;
    }
};

userSchema.methods.generateRefreshToken = async function () {
    try {
        return jwt.sign(
            {
                _id: this._id
            },
            config.refreshToken.secret,
            {
                expiresIn: config.refreshToken.expiry,
            },
        );
    } catch (error) {
        throw error;
    }
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
