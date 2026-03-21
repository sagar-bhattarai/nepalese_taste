import config from "../configs/config.js";
import profileService from "../services/profile.service.js";


const getProfile = async (req, res) => {
    try {
        const profile = await profileService.get(req.user._id);

        return res
            .status(200)
            .json(
                {
                    api: config.api,
                    profile,
                    message: "profile fetched successfully"
                }
            );
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "server error while fetching profile." });
    }
}

const updateProfile = async (req, res) => {
    try {
        const edited = await profileService.edit(req);
        return res
            .status(200)
            .json({ api: config.api, edited, message: "profile updated successfully." });
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || `error while updating profile ::  ${error}` });
    }
}

const deactivateProfile = async (req, res) => {
    try {
        await profileService.deactivate(req, res);

        // return res
        //     .status(200)
        //     .json({ api: config.api, message: "profile deactivated successfully" });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "error while deactivating profile." });
    }
}

const deleteProfile = async (req, res) => {
    try {
        await profileService.remove(reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq.user._id); 

        return res
            .status(200)
            .json({ api: config.api, message: "profile deleted successfully" });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "error while deleting profile." });
    }
}
export {  getProfile, deleteProfile, updateProfile, deactivateProfile }