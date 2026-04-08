import reccommendationService from  "../services/recommendation.service.js";
import config from "../configs/config.js";


const trackTheProductViews = async (req, res) =>{
    try {
        const result = await reccommendationService.trackView(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "productView added successfully" });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while adding productView." });
    }
}

const getRecommendations = async (req, res) =>{
    try {
        const result = await reccommendationService.recommendations(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "recommendations fetched successfully" });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while fetching recommendations." });
    }
}



export { trackTheProductViews, getRecommendations}
