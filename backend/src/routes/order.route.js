import express from "express";
import {
  createOrder,
  getOrderByTrackingId,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  confirmOrder
}from "../controllers/order.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addOrderSchema from "../zod/orders/addOrders.schema.js";

const router = express.Router();

router.post("/add", zodValidation(addOrderSchema), createOrder);
router.get("/all", getAllOrders);
router.put("/updateStatus/:id", updateOrderStatus);
router.put("/cancel/:id", cancelOrder);
router.post("/confirm/:id", confirmOrder);

export default router;