import express from "express";
import connectDatabase from "./dbConnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";


import AuthRoute from "./Routes/api/AuthRoute.js";
import UserRoute from "./Routes/api/UserRoute.js";
import ShopRoute from "./Routes/api/ShopRoute.js";
import ProductRoute from "./Routes/api/ProductRoute.js";
import OrderRoute from "./Routes/api/OrderRoute.js";
import WishListRoute from "./Routes/api/WishListRoute.js";
import successMiddleware from "./Utils/HandleSuccess.js";
//import errorHandler from "./MiddleWare/ErrorHandler.js";
import ReviewsRoute from "./Routes/api/ReviewRoute.js";


const app = express();
const portNo = process.env.PORT || 5000;
dotenv.config();


//middleware
//app.use(errorHandler);

app.use(successMiddleware);
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials:true
}));
//app.use(validator());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//connect to db function
connectDatabase();

//routes
app.use("/api/v1/auth", AuthRoute);//http://localhost:5000/api/v1/auth/login-user
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/shop", ShopRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/order", OrderRoute);
app.use("/api/v1/wishlist", WishListRoute);
app.use("/api/v1/review", ReviewsRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong.";

  res.status(status).json({ success: false, error: message });
  // Call next with the error to pass it to the next error-handling middleware
  next(err);
});

app.listen(portNo, () => console.log(`listening on port: ${portNo} `));



