import config from "../configs/config.js";
import starReviewService from "../services/starReview.service.js";


const addStarReview = async (req, res) => {
    try {
        const result = await starReviewService.rateProduct(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "starReviews added successfully." });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while adding starReviews." });
    }
}


export { addStarReview };
