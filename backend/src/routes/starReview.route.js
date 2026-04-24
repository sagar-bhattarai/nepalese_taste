import express from "express";
import { addStarReview }from "../controllers/starReviews.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addStarReviewSchema from "../zod/review/starReview.schema.js";

import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import {CUSTOMER } from "../constants/roles.constant.js";

const router = express.Router();

router.post("/rate", zodValidation(addStarReviewSchema), roleBasedAuth(CUSTOMER), addStarReview);


export default router;