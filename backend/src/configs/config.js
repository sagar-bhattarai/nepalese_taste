const config = {
    api: {
        name: process.env.NAME || "",
        version: process.env.VERSION || "",
        status: process.env.STATUS || "",
        port: process.env.PORT || "",
    },

    mongodb_url: process.env.MONGO_DB_URI || "",

    accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET || "",
        expiry: process.env.ACCESS_TOKEN_EXPIRY || "",
    },

    refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET || "",
        expiry: process.env.REFRESH_TOKEN_EXPIRY || "",
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
    },

    adminEmail: {
        address: process.env.ADMIN_EMAIL || "",
        password: process.env.ADMIN_EMAIL_PASSWORD || "",
    },

}

export default config;