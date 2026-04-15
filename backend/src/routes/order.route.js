import express from "express";
import {
  createOrder,
  getOrderByTrackingId,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  confirmOrder,
  orderPaymentviaStripe,
  updateOrderPayment
}from "../controllers/order.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addOrderSchema from "../zod/orders/addOrders.schema.js";

import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { ADMIN, CUSTOMER } from "../constants/roles.constant.js";

const router = express.Router();

router.post("/add", zodValidation(addOrderSchema), roleBasedAuth(CUSTOMER), createOrder);
router.get("/all", getAllOrders);
router.patch("/updateStatus/:id", updateOrderStatus);
router.patch("/paymentStatus/:id", updateOrderPayment);
router.put("/cancel/:id", cancelOrder);
router.post("/confirm/:id", roleBasedAuth(ADMIN), confirmOrder);
router.post("/:id/payment/stripe", roleBasedAuth(CUSTOMER), orderPaymentviaStripe);

export default router;