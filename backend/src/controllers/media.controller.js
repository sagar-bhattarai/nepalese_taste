import mediaService from "../services/media.service.js";
import config from "../configs/config.js";

const getAllMedia = async (req, res) => {
    try {
        const media = await mediaService.all(req);

        return res
            .status(200)
            .json({ api: config.api, result: media, message: "media fetched successfully." });
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "server error while fetching all media." })

    }
};

const deleteMedia = async (req, res) => {
    try {
        const media = await mediaService.deleteOne(req);

        return res
            .status(200)
            .json({ api: config.api, result: media, message: "media deleted successfully." });
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "server error while deleting media." })

    }
};

export { getAllMedia, deleteMedia };
