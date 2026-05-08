import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../configs/config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // delete temp file safely
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.log("Cloudinary upload error:", error);

    //  delete temp file safely
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;


// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import config from "../configs/config.js";

// cloudinary.config({
//     cloud_name: config.cloudinary.cloud_name,
//     api_key: config.cloudinary.api_key,
//     api_secret: config.cloudinary.api_secret,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;
//         const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto", });
//         fs.unlinkSync(localFilePath);
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         return null;
//     }
// }

// export default uploadOnCloudinary;