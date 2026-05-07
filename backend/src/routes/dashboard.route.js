import express from "express";
import auth from "../middlewares/auth.middleware.js"
import { getCustomerDashboardData, getAdminDashboardData, getAdminChartsData} from "../controllers/dashboard.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { CUSTOMER, ADMIN } from "../constants/roles.constant.js";


const router = express.Router();

router.get("/customerSummary", roleBasedAuth(CUSTOMER), getCustomerDashboardData);
router.get("/adminSummary", roleBasedAuth(ADMIN),  getAdminDashboardData);
router.get("/chartsData", roleBasedAuth(ADMIN),  getAdminChartsData);

export default router;