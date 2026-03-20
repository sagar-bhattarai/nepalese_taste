import uploadOnCloudinary from "./cloudinary.js";

 const uploadImage = async (req) => {
    // if (!req.file?.path) return null;
    if (req?.file !== undefined && Object.hasOwn(req?.file, "path")) {
        const upload = await uploadOnCloudinary(req.file.path);
        if (!upload) {
            throw {
                customStatus: 400,
                customMessage: "could not upload image",
            };
        }
        return upload.url;
    }
}

export default uploadImage;