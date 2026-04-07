import express from "express";
import  { trackTheProductViews, getRecommendations}from "../controllers/recommendation.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addRecommendationSchema from "../zod/recommendation/addRecommendation.schema.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all", getRecommendations);
router.post("/add/:id", auth, zodValidation(addRecommendationSchema), trackTheProductViews);

export default router;