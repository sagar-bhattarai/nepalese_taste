
/*
*
  for multiple order
*
*/


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        itemOrderStatus: {
          type: String,
          enum: ["PENDING", "CONFIRMED", "CANCELLED", "SHIPPED", "DELIVERED"],
          default: "PENDING",
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["CASH_PENDING", "ALL_PENDING", "ALL_CONFIRMED", "ALL_CANCELLED", "ALL_SHIPPED", "ALL_DELIVERED"],
      default: "PENDING",
    },

    trackingId: {
      type: String,
      unique: true,
    },

    deliveryType: {
      type: String,
    },
    deliveryAddress: {
      type: String,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;



