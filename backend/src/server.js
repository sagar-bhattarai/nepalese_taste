import express from "express";
import config from "./configs/config.js";
import cookieParser from "cookie-parser";
import logger from "./middlewares/log.middleware.js";
import auth from "./middlewares/auth.middleware.js";
// import roleBasedAuth from "./middlewares/roleBasedAuth.middleware.js";
// import { CUSTOMER, MERCHANT, STAFF, ADMIN } from "./constants/roles.constant.js";
import cors from "cors";

process.on('unhandledRejection', (reason, promise) => {
    console.error(' #################  Error :: Global Unhandled Promise Rejection ################# ',reason);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(logger);


server.get('/', (req, res) => { res.send(config.api) });
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";

server.use("/api/v1/users", userRouter);
server.use("/api/v1/products", productRouter);
// server.use("/api/v1/categories", auth , roleBasedAuth(ADMIN), categoryRouter);
server.use("/api/v1/categories", categoryRouter);
server.use("/api/v1/orders", auth , orderRouter);
server.use("/api/v1/payments", auth , paymentRouter);

export { server };