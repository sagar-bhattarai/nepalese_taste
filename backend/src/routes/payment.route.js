import express from "express";
import { addPayment, getAllPayment, updatePayment, getPaymentById, deletePayment } from "../controllers/payment.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { CUSTOMER, MERCHANT, ADMIN } from "../constants/roles.constant.js";

import zodValidator from "../middlewares/zod.validator.middleware.js";
import paymentSchema from "../zod/payment/addPayment.schema.js";
import updatePaymentSchema from "../zod/payment/updatePayment.schema.js";

const router = express.Router();

/** 
 * POST /api/payments/add
*/
router.post("/add", roleBasedAuth(CUSTOMER), zodValidator(paymentSchema), addPayment);

/** 
 * GET /api/payments/all
*/
router.get("/all", roleBasedAuth([MERCHANT, ADMIN]), getAllPayment);

/** 
 * PATCH /api/payments/update/:id
*/
router.patch("/update/:id", roleBasedAuth([MERCHANT, ADMIN]), zodValidator(updatePaymentSchema),updatePayment);

/** 
 * GET /api/payments/payment/:id
*/
router.get("/payment/:id", getPaymentById);

/** 
 * GET /api/payments/payment/delete/:id
*/
router.get("/payment/delete/:id", roleBasedAuth(ADMIN), deletePayment);


export default router;