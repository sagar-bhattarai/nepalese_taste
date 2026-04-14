import axios from 'axios';
import config from "../configs/config.js";
import Stripe from "stripe";

const payViaStripe = async (data) => {
    const stripe = new Stripe(config.stripe.stripe_secret_key);

    return await stripe.paymentIntents.create({
        amount: data.amount,
        currency: data.currency || "npr",
        metadata:{
            customer_name: data.customer.userName,
            customer_email: data.customer.userEmail,
            customer_phone: data.customer.phone,

            // order_id: data.order.orderId,
            // order_name: data.order.orderName,
            
            order_id: data.orderId,
            order_name: data.orderName,
        }
    });
}

const payViaKhalti = async (payload) => {
    try {
        const response = await fetch(
            "https://dev.khalti.com/api/v2/epayment/initiate/",
            {
                method: "POST",
                headers: {
                    "Authorization": `${config.khalti_live_secret_key}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            // console.error("Khalti Error:", result);
            throw new Error(result.detail || "Khalti payment failed");
        }
        return result;

    } catch (error) {
        console.log(error);
    }
}

// const payViaCash = async (id, purchase_order_id, grandTotal, user) => {
const payViaCash = async (data) => {
    const order = await findOrderOnDb(id, "id");

    const orderPayment = await PaymentModel.create({
        transactionId: purchase_order_id,
        method: "CASH",
        amount: grandTotal,
    })

    return await OrderModel.findByIdAndUpdate(id, {
        payment: orderPayment._id,
        orderStatus: "CONFIRMED"
    })
}

export { payViaStripe, payViaKhalti, payViaCash }