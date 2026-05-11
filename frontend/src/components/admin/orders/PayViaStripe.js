// "use client"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import Modal from "../../Modal";
import { useState } from 'react';
import config from "../../../config/config.js"
import { loadStripe } from '@stripe/stripe-js';
import { payViaStripe } from "../../../apis/order.api.js";
import { orderPaymentConfirmed } from "../../../apis/order.api.js";
import { toast } from "react-toastify";

const CheckOutForm = ({ id }) => {

    const [show, setShow] = useState(false)

    const elements = useElements();
    const stripe = useStripe();

    const initPaymentStripe = async () => {
        try {
            const response = await payViaStripe(id);
            const clientSecret = response.client_secret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                },
            });

            if (result && result?.paymentIntent?.status === "succeeded") {
                await orderPaymentConfirmed(id, { status: 'COMPLETED' });
                setShow(false);
                return toast.success("payment successfull.");
            }

        } catch (error) {
            toast.error("payment failed.");
            setShow(false);
        }
    }

    return (
        <>
            <button onClick={() => setShow(true)} className={`${id ? "" : "rounded-tl-xl"}  bg-amber-300  cursor-pointer hover:bg-amber-600 transition-all duration-300  py-4 text-center  text-gray-900 w-full`}><p className="font-semibold text-xs  whitespace-nowrap px-4" >Stripe Payment</p></button>
            <Modal show={show} setShow={setShow} title={"Card Payment"} onConfirm={initPaymentStripe}>
                <div className="my-5">
                    <CardElement />
                </div>
            </Modal>
        </>
    )
}

const PayViaStripe = ({ id }) => {
    // const stripePromise = loadStripe(config.stripePublishableKey);
    const stripePromise = loadStripe("pk_test_51TKv3RAXDKv89r5LGSvbDPTl1IMxbIhy6ZhwtSLxViuIeYcpi7lUt8Hh5zFkgCXLN1kONa7RoI3st1TJFYuHBRIw00lqIVlKFt");

    return <Elements stripe={stripePromise} >
        <CheckOutForm id={id} />
    </Elements>
}

export default PayViaStripe;