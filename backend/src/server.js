import express from "express";
import config from "./configs/config.js";
import cookieParser from "cookie-parser";
import logger from "./middlewares/log.middleware.js";
import auth from "./middlewares/auth.middleware.js";
import roleBasedAuth from "./middlewares/roleBasedAuth.middleware.js";
import { CUSTOMER, MERCHANT, STAFF, ADMIN } from "./constants/roles.constant.js";
import cors from "cors";

process.on('unhandledRejection', (reason, promise) => {
  console.error(' #################  Error :: Global Unhandled Promise Rejection ################# ', reason);
});

const server = express();

// server.use(cors());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://nepalese-taste.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"], //  ADD THIS
};
server.use(cors(corsOptions));

// server.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // https://nepalese-taste.vercel.app
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
//   next();
// });

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(logger);


server.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


server.use((req, res, next) => {
  next();
});


server.get('/', (req, res) => { res.send(config.api) });
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";
import mediaRouter from "./routes/media.route.js";
import recommendationRouter from "./routes/recommendation.route.js";
import commentRouter from "./routes/comment.route.js";
import starReviewRouter from "./routes/starReview.route.js";
import favouriteRouter from "./routes/favourite.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import testimonialRouter from "./routes/testimonial.route.js";

server.use("/api/v1/users", userRouter);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/categories", categoryRouter);
server.use("/api/v1/orders", auth, orderRouter);
server.use("/api/v1/payments", auth, paymentRouter);
// server.use("/api/v1/medias", auth , roleBasedAuth(ADMIN), mediaRouter);
server.use("/api/v1/medias", auth, mediaRouter);
server.use("/api/v1/recommendations", recommendationRouter);
server.use("/api/v1/comments", commentRouter);
server.use("/api/v1/starReviews", auth, starReviewRouter);
server.use("/api/v1/favourites", auth, roleBasedAuth(CUSTOMER), favouriteRouter);
server.use("/api/v1/dashboard", auth, dashboardRouter);
server.use("/api/v1/testimonials", testimonialRouter);



server.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

export { server };