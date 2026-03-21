import express from "express";
import { getDashboardData} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary", getDashboardData);

export default router;